import React, { useMemo } from 'react';
import { AbsoluteFill, useCurrentFrame, random } from 'remotion';

export const SubtleBackground: React.FC = () => {
	const frame = useCurrentFrame();

	const dots = useMemo(() => {
		return new Array(40).fill(0).map((_, i) => ({
			x: random(i + 'x') * 100,
			y: random(i + 'y') * 100,
			size: random(i + 's') * 6 + 2,
			speedX: (random(i + 'sx') - 0.5) * 0.15,
			speedY: (random(i + 'sy') - 0.5) * 0.15,
			opacity: random(i + 'o') * 0.18 + 0.12,
		}));
	}, []);

	return (
		<AbsoluteFill style={{ zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
			{/* Grid pattern */}
			<div
				style={{
					position: 'absolute',
					top: '-20%',
					left: '-20%',
					right: '-20%',
					bottom: '-20%',
					backgroundImage: `
						radial-gradient(circle at center, rgba(18,18,18,0.06) 2px, transparent 2px)
					`,
					backgroundSize: '40px 40px',
					transform: `translate(${(frame * 0.3) % 40}px, ${(frame * 0.3) % 40}px)`,
				}}
			/>
            
			{/* Floating glowing orbs */}
			<div style={{
				position: 'absolute',
				width: '80vw',
				height: '80vw',
				borderRadius: '50%',
				background: 'radial-gradient(circle, rgba(205,236,160,0.15) 0%, rgba(205,236,160,0) 70%)',
				top: '-20%',
				left: '-20%',
				transform: `translate(${Math.sin(frame * 0.01) * 60}px, ${Math.cos(frame * 0.01) * 60}px)`,
				filter: 'blur(60px)',
			}} />
            
			<div style={{
				position: 'absolute',
				width: '70vw',
				height: '70vw',
				borderRadius: '50%',
				background: 'radial-gradient(circle, rgba(160,205,236,0.12) 0%, rgba(160,205,236,0) 70%)',
				bottom: '-20%',
				right: '-20%',
				transform: `translate(${Math.cos(frame * 0.015) * 80}px, ${Math.sin(frame * 0.015) * 80}px)`,
				filter: 'blur(60px)',
			}} />

			{/* Drifting dots */}
			{dots.map((dot, i) => {
				const x = (dot.x + frame * dot.speedX) % 100;
				const y = (dot.y + frame * dot.speedY) % 100;
                
				// Wrap around logic
				const displayX = x < 0 ? x + 100 : x;
				const displayY = y < 0 ? y + 100 : y;

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: `${displayX}%`,
							top: `${displayY}%`,
							width: dot.size,
							height: dot.size,
							backgroundColor: '#121212',
							borderRadius: '50%',
							opacity: dot.opacity,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
