import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	spring,
	Easing,
} from 'remotion';
import { SubtleBackground } from '../components/SubtleBackground';

const fontFamily = 'Geist Pixel';

const FieldSVG = () => (
	<svg
		width="1920"
		height="600"
		viewBox="0 0 1920 600"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{/* Soil Layers */}
		<rect x="0" y="300" width="1920" height="300" fill="#8B5A2B" />
		<rect x="0" y="320" width="1920" height="20" fill="#70441E" />
		<rect x="0" y="360" width="1920" height="20" fill="#70441E" />
		<rect x="0" y="400" width="1920" height="20" fill="#70441E" />
		<rect x="0" y="440" width="1920" height="20" fill="#70441E" />
		<rect x="0" y="480" width="1920" height="20" fill="#70441E" />
		<rect x="0" y="520" width="1920" height="20" fill="#70441E" />
		<rect x="0" y="560" width="1920" height="20" fill="#70441E" />
		
		{/* Crop Row 1 (Background) */}
		{Array.from({length: 30}).map((_, i) => (
			<path key={`r1-${i}`} d={`M ${-50 + i * 80} 300 L ${-40 + i * 80} 240 L ${-30 + i * 80} 300 Z`} fill="#6B8E23" />
		))}

		{/* Crop Row 2 (Middle) */}
		{Array.from({length: 25}).map((_, i) => (
			<path key={`r2-${i}`} d={`M ${-20 + i * 100} 360 L ${-5 + i * 100} 280 L ${10 + i * 100} 360 Z`} fill="#556B2F" />
		))}

		{/* Crop Row 3 (Foreground) */}
		{Array.from({length: 20}).map((_, i) => (
			<path key={`r3-${i}`} d={`M ${30 + i * 120} 420 L ${50 + i * 120} 310 L ${70 + i * 120} 420 Z`} fill="#808000" />
		))}
		
		{/* Sun */}
		<circle cx="250" cy="120" r="70" fill="#FFD700" opacity="0.8" />
		<circle cx="250" cy="120" r="110" fill="#FFD700" opacity="0.4" />
	</svg>
);

export const Scene2b: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	const text = 'One app for everything your farm needs. Farmagotchi simplifies crop management, task tracking, and resource planning — so you can focus on what matters: growing something great.';
	const words = text.split(' ');

	const textStartFrame = 10;
	// Shorter timing: move camera starting earlier
	const cameraMoveStart = 140;
	
	const fadeOutStart = durationInFrames - 30;
	const sceneOpacity = interpolate(
		frame,
		[fadeOutStart, durationInFrames],
		[1, 0],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
	);

	// Text fades out when camera moves
	const easeInOutExpo = Easing.bezier(0.87, 0, 0.13, 1);
	
	// Camera zooms into the field and pans UP
	const fieldScale = interpolate(
		frame,
		[cameraMoveStart, cameraMoveStart + 100],
		[0.5, 1.5],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOutExpo }
	);
	
	// Field starts below the screen and moves UP
	const fieldTranslateY = interpolate(
		frame,
		[cameraMoveStart, cameraMoveStart + 100],
		[700, 300],
		{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeInOutExpo}
	);

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
			<SubtleBackground />
			<div style={{ width: '100%', height: '100%', opacity: sceneOpacity, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				
				<div
					style={{
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'center',
						alignItems: 'center',
						alignContent: 'center',
						gap: '0.3em',
						fontFamily,
						fontSize: 45,
						fontWeight: 'bold',
						color: '#333',
						textAlign: 'center',
						position: 'absolute',
						zIndex: 10,
						width: '80%',
					}}
				>
					{words.map((word, i) => {
						const delay = i * 2;
						const wordSpring = spring({
							frame: Math.max(0, frame - textStartFrame - delay),
							fps,
							config: { damping: 14, stiffness: 150 },
						});

						const opacity = interpolate(wordSpring, [0, 1], [0, 1]);
						const translateX = interpolate(wordSpring, [0, 1], [30, 0]);
						const blur = interpolate(wordSpring, [0, 1], [5, 0]);

						return (
							<span
								key={i}
								style={{
									opacity,
									display: 'inline-block',
									transform: `translateX(${translateX}px)`,
									filter: `blur(${blur}px)`,
								}}
							>
								{word}
							</span>
						);
					})}
				</div>

				{/* Field starts off-screen (pushed down by translateY) and moves up */}
				<AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
					<div
						style={{
							transform: `translateY(${fieldTranslateY}px) scale(${fieldScale})`,
							transformOrigin: '50% 50%',
							opacity: interpolate(
								frame,
								[cameraMoveStart - 40, cameraMoveStart],
								[0, 1],
								{ extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
							)
						}}
					>
						<FieldSVG />
					</div>
				</AbsoluteFill>
			</div>
		</AbsoluteFill>
	);
};
