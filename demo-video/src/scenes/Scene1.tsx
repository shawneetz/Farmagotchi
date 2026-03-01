import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
	Img,
	staticFile,
} from 'remotion';
import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

export const Scene1: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	// Global fade out for the scene (overlap starts at 130, sequence ends at 150)
	const globalOpacity = interpolate(frame, [120, 150], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	// --- Logo Logic ---
	// Logo scale in with high stiffness
	const logoScale = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 120},
	});

	// Logo shift left
	const logoShift = spring({
		frame: Math.max(0, frame - 12),
		fps,
		config: {damping: 14, stiffness: 100},
	});
	const logoTranslateX = interpolate(logoShift, [0, 1], [0, -480]);

	// --- Typewriter Logic ---
	const text = 'Farmagotchi';
	const framesPerChar = 2; // Sped up
	const typeWriterStartFrame = 25;
	const typeWriterFrame = Math.max(0, frame - typeWriterStartFrame);

	const charsToShow = Math.floor(typeWriterFrame / framesPerChar);
	const textToShow = text.slice(0, charsToShow);

	// --- Bottom Text Logic ---
	const bottomText = 'til - day[0]';
	const characters = bottomText.split('');

	return (
		<AbsoluteFill style={{backgroundColor: 'transparent'}}>
			<SubtleBackground />
			<div
				style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					fontFamily,
					color: '#121212',
					opacity: globalOpacity,
				}}
			>
				{/* Main Logo & Title Wrapper */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						height: 300,
						width: '100%',
					}}
				>
					{/* Logo */}
					<div
						style={{
							position: 'absolute',
							transform: `translateX(${logoTranslateX}px) scale(${logoScale})`,
							width: 400,
							height: 400,
							borderRadius: 60,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 2,
							overflow: 'hidden',
						}}
					>
						<Img 
							src={staticFile('Logo-only.png')} 
							style={{ width: '80%', height: '80%', objectFit: 'contain' }} 
						/>
					</div>

					{/* Typewriter text */}
					{frame >= typeWriterStartFrame && (
						<div
							style={{
								position: 'absolute',
								left: '50%',
								transform: 'translateX(-340px)', // adjust based on logo offset
								fontSize: 180,
								color: '#121212',
								whiteSpace: 'nowrap',
								display: 'flex',
								alignItems: 'center',
								letterSpacing: '-6px',
							}}
						>
							{textToShow}
						</div>
					)}
				</div>

				{/* Staggered Bottom Text */}
				<div
					style={{
						position: 'absolute',
						bottom: '35%',
						display: 'flex',
						gap: '8px',
					}}
				>
					{characters.map((char, i) => {
						const delay = 60 + i * 2;
						
						const popSpring = spring({
							frame: Math.max(0, frame - delay),
							fps,
							config: {damping: 12, stiffness: 150},
						});

						const scale = interpolate(popSpring, [0, 1], [0.5, 1]);
						const opacity = interpolate(popSpring, [0, 1], [0, 1]);
						const translateY = interpolate(popSpring, [0, 1], [20, 0]);

						return (
							<div
								key={i}
								style={{
									fontSize: 60,
									color: '#121212',
									opacity,
									transform: `translateY(${translateY}px) scale(${scale})`,
									letterSpacing: '-2px',
								}}
							>
								{char}
							</div>
						);
					})}
				</div>
			</div>
		</AbsoluteFill>
	);
};
