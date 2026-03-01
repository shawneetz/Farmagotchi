import React from 'react';
import { interpolate, spring } from 'remotion';

export const FieldSVG: React.FC<{ frame: number; fps: number; startFrame: number }> = ({ frame, fps, startFrame }) => {
	return (
		<svg
			width="1920"
			height="600"
			viewBox="0 0 1920 600"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ overflow: 'visible' }}
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
			{Array.from({length: 30}).map((_, i) => {
				const cropStart = startFrame + i * 1.5;
				const cropSpring = spring({
					frame: Math.max(0, frame - cropStart),
					fps,
					config: { damping: 12, stiffness: 150 },
				});
				const scale = interpolate(cropSpring, [0, 1], [0, 1]);
				return (
					<path 
						key={`r1-${i}`} 
						d={`M ${-50 + i * 80} 300 L ${-40 + i * 80} 240 L ${-30 + i * 80} 300 Z`} 
						fill="#6B8E23" 
						style={{
							transform: `scale(${scale})`,
							transformOrigin: `${-40 + i * 80}px 300px`
						}}
					/>
				);
			})}

			{/* Crop Row 2 (Middle) */}
			{Array.from({length: 25}).map((_, i) => {
				const cropStart = startFrame + 10 + i * 2;
				const cropSpring = spring({
					frame: Math.max(0, frame - cropStart),
					fps,
					config: { damping: 12, stiffness: 150 },
				});
				const scale = interpolate(cropSpring, [0, 1], [0, 1]);
				return (
					<path 
						key={`r2-${i}`} 
						d={`M ${-20 + i * 100} 360 L ${-5 + i * 100} 280 L ${10 + i * 100} 360 Z`} 
						fill="#556B2F" 
						style={{
							transform: `scale(${scale})`,
							transformOrigin: `${-5 + i * 100}px 360px`
						}}
					/>
				);
			})}

			{/* Crop Row 3 (Foreground) */}
			{Array.from({length: 20}).map((_, i) => {
				const cropStart = startFrame + 20 + i * 2.5;
				const cropSpring = spring({
					frame: Math.max(0, frame - cropStart),
					fps,
					config: { damping: 12, stiffness: 150 },
				});
				const scale = interpolate(cropSpring, [0, 1], [0, 1]);
				return (
					<path 
						key={`r3-${i}`} 
						d={`M ${30 + i * 120} 420 L ${50 + i * 120} 310 L ${70 + i * 120} 420 Z`} 
						fill="#808000"
						style={{
							transform: `scale(${scale})`,
							transformOrigin: `${50 + i * 120}px 420px`
						}}
					/>
				);
			})}
			
			{/* Sun */}
			<circle cx="250" cy="120" r="70" fill="#FFD700" opacity="0.8" />
			<circle cx="250" cy="120" r="110" fill="#FFD700" opacity="0.4" />
		</svg>
	);
};
