"use client";
import React, { useState, useEffect } from "react";
import { getPokemons, getTypes, getPokemonDetails } from "../api/data";
import { pokemonTypeIcons, colorType } from "../public/icons/types";
import { Card, Input, Modal, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function Home() {
	const [pokemons, setPokemons] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [page, setPage] = useState(1);
	const [limit] = useState(50);
	const [nameFilter, setNameFilter] = useState("");
	const [typeFilter, setTypeFilter] = useState("");
	const [availableTypes, setAvailableTypes] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPokemon, setSelectedPokemon] = useState(null);
	const [details, setDetails] = useState(null);

	useEffect(() => {
		const loadTypes = async () => {
			try {
				const typesData = await getTypes();
				setAvailableTypes(typesData || []);
			} catch {
				setAvailableTypes([]);
			}
		};
		loadTypes();
	}, []);

	useEffect(() => {
		let ticking = false;
		const handleScroll = () => {
			if (loading || !hasMore || ticking) return;
			if (
				window.innerHeight + window.scrollY >=
				document.documentElement.scrollHeight - 100
			) {
				ticking = true;
				setPage((prev) => prev + 1);
				setTimeout(() => {
					ticking = false;
				}, 800);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [loading, hasMore]);

	useEffect(() => {
		setPage(1);
		setPokemons([]);
		setHasMore(true);
	}, [nameFilter]);

	useEffect(() => {
		const fetchPokemons = async () => {
			if (loading || !hasMore) return;

			setLoading(true);
			setError("");

			try {
				// console.log(`page ${page}...`);
				const data = await getPokemons({
					page,
					limit,
					name: nameFilter,
					types: [],
				});

				const newPokemons = Array.isArray(data) ? data : data.pokemons || [];

				console.log(
					`Page ${page}:`,
					newPokemons.map((p) => `#${p.pokedexId} ${p.name}`)
				);

				if (page === 1) {
					setPokemons(newPokemons);
				} else {
					setPokemons((prev) => [...prev, ...newPokemons]);
				}

				setHasMore(newPokemons.length === limit);
			} catch (err) {
				setError("Erreur lors du chargement des Pokémons");
			} finally {
				setLoading(false);
			}
		};

		fetchPokemons();
	}, [page, limit, nameFilter]);

	const handleOpenModal = async (pokemon) => {
		setSelectedPokemon(pokemon);
		setModalOpen(true);
		try {
			const data = await getPokemonDetails(pokemon.pokedexId);
			setDetails(data);
		} catch {
			setDetails(null);
		}
	};

	const handleCloseModal = () => {
		setModalOpen(false);
		setSelectedPokemon(null);
		setDetails(null);
	};

	useEffect(() => {
		let mounted = true;

		const loadEvolutionImages = async () => {
			if (!details || !details.evolutions || details.evolutions.length === 0)
				return;

			const needFetch = details.evolutions.some((evo) => !evo.image);
			if (!needFetch) return;

			try {
				const updatedEvolutions = await Promise.all(
					details.evolutions.map(async (evo) => {
						const evoDetails = await getPokemonDetails(evo.pokedexId);
						return {
							...evo,
							image: evoDetails.image || evoDetails.sprite || null,
						};
					})
				);

				if (!mounted) return;

				setDetails((prev) =>
					prev ? { ...prev, evolutions: updatedEvolutions } : prev
				);
			} catch {
				/* ignore */
			}
		};

		loadEvolutionImages();

		// if (pokemons && pokemons.length > 0) {
			//   console.log(pokemons[0].types[0].name);
			//   console.log(iconTypes);
			//   console.log(pokemonTypeIcons);
		// 	console.log(pokemons);
		// }

		return () => {
			mounted = false;
		};
	}, [details?.evolutions]);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "20px",
					backgroundColor: "#ee1515",
					color: "white",
					gap: "15px",
				}}
			>
				<img
					src='/android-chrome-512x512.png'
					alt='Logo'
					style={{ width: "50px", height: "50px" }}
				/>
				<h1
					style={{
						fontWeight: "bold",
						fontSize: "2.8rem",
						letterSpacing: "0.12em",
						textShadow: "2px 2px 8px #222, 0 0 2px #fff",
						color: "white",
						margin: 0,
						padding: "0 10px",
					}}
				>
					Pokédex
				</h1>
				<Input
					startAdornment={<SearchIcon />}
					type='text'
					placeholder='Rechercher un Pokémon...'
					value={nameFilter}
					style={{
						maxWidth: "300px",
						width: "100%",
						padding: "10px",
						borderRadius: "5px",
						border: "none",
						color: "white",
						backgroundColor: "#222224",
					}}
					onChange={(e) => setNameFilter(e.target.value)}
				/>
				<select
					value={typeFilter}
					onChange={(e) => setTypeFilter(e.target.value)}
					style={{
						padding: "10px",
						borderRadius: "5px",
						border: "none",
						color: "white",
						backgroundColor: "#222224",
						cursor: "pointer",
					}}
				>
					<option value=''>Tous les types</option>
					{availableTypes.map((type, idx) => (
						<option
							key={typeof type === "string" ? type : type.name + "-" + idx}
							value={typeof type === "string" ? type : type.name}
						>
							{typeof type === "string" ? type : type.name}
						</option>
					))}
				</select>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
					gap: "20px",
					padding: "20px",
				}}
			>
				{pokemons
					.filter(
						(pokemon) =>
							!typeFilter || pokemon.types.some((t) => t.name === typeFilter)
					)
					.map((pokemon) => (
						<div
							key={pokemon.pokedexId}
							style={{
								border: "1px solid #ccc",
								borderRadius: "8px",
								padding: "15px",
								textAlign: "center",
								cursor: "pointer",
							}}
							onClick={() => handleOpenModal(pokemon)}
						>
							<Card
								style={{
									height: "100%",
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
								}}
							>
								<h6>#{pokemon.pokedexId}</h6>
								<h2>{pokemon.name}</h2>
								<img
									src={pokemon.image}
									alt={pokemon.name}
									style={{ maxWidth: "100%", height: "auto" }}
								/>
								<div>
									{pokemon.types &&
										pokemon.types.map((type, idx) => (
											<span
												key={`${type.name}-${idx}`}
												style={{
													display: "inline-flex",
													alignItems: "center",
													background: colorType[type.name] || "#f0f0f0",
													borderRadius: "4px",
													padding: "3px 5px",
													margin: "3px",
													fontSize: "0.8em",
												}}
											>
												<img
													src={pokemonTypeIcons[type.name]}
													alt={type.name}
													style={{
														width: "24px",
														height: "24px",
														marginRight: "5px",
													}}
												/>
												{type.name}
											</span>
										))}
								</div>
							</Card>
						</div>
					))}
				{loading && <p>Chargement...</p>}
				{error && <p style={{ color: "red" }}>{error}</p>}
			</div>

			<Modal open={modalOpen} onClose={handleCloseModal}>
				<div
					style={{
						background: "#fff",
						borderRadius: "12px",
						maxWidth: "400px",
						margin: "60px auto",
						padding: "30px",
						outline: "none",
						boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
						position: "relative",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Button
						variant='contained'
						color='error'
						onClick={handleCloseModal}
						style={{ position: "absolute", top: "15px", right: "15px" }}
					>
						<CloseIcon />
					</Button>
					{details ? (
						<>
							<h2>{details.name}</h2>
							<img
								src={details.image}
								alt={details.name}
								style={{ width: "120px", height: "120px" }}
							/>
							<div style={{ margin: "10px 0" }}>
								<strong>Stats :</strong>
								<ul style={{ paddingLeft: "20px", margin: 0 }}>
									{details.stats &&
										Object.entries(details.stats).map(([stat, value]) => (
											<li key={stat}>
												{stat} : {value}
											</li>
										))}
								</ul>
							</div>
							<div style={{ margin: "10px 0" }}>
								<strong>Évolutions :</strong>
								<ul style={{ paddingLeft: "20px", margin: 0 }}>
									{details.evolutions && details.evolutions.length > 0 ? (
										details.evolutions.map((evo) => (
											<li key={evo.pokedexId}>
												<img
													src={evo.image || "/android-chrome-512x512.png"}
													alt={evo.name}
													style={{
														width: "100px",
														height: "100px",
														verticalAlign: "middle",
														marginRight: "8px",
														objectFit: "contain",
													}}
												/>
												{evo.name}
											</li>
										))
									) : (
										<li>N'évolue plus (peut etre Mega :p)</li>
									)}
								</ul>
							</div>
						</>
					) : (
						<p>Chargement...</p>
					)}
				</div>
			</Modal>
		</>
	);
}
