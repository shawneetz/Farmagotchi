import {Sequence, AbsoluteFill} from 'remotion';
import {Scene1} from './scenes/Scene1';
import {Scene2} from './scenes/Scene2';
import {Scene2b} from './scenes/Scene2b';
import {Scene3} from './scenes/Scene3';
import {Scene4} from './scenes/Scene4';
import {Scene5} from './scenes/Scene5';
import {Scene6} from './scenes/Scene6';
import {Scene7} from './scenes/Scene7';
import {Scene8} from './scenes/Scene8';
import {Scene9} from './scenes/Scene9';
import { Audio, staticFile } from 'remotion';

export const MyComposition = () => {
	const musicDurationInFrames = 6611; // 110.18s * 60 fps
	const trimOffset = 1080;
	const segmentDuration = musicDurationInFrames - trimOffset;

	return (
		<AbsoluteFill style={{ backgroundColor: '#E1F6C0' }}>
			{/* Looping Audio */}
			<Sequence from={0} durationInFrames={segmentDuration}>
				<Audio src={staticFile('music.mp3')} volume={0.3} trimBefore={trimOffset}/>
			</Sequence>
			<Sequence from={segmentDuration}>
				<Audio src={staticFile('music.mp3')} volume={0.3} trimBefore={trimOffset}/>
			</Sequence>

			<Sequence durationInFrames={150}>
				<Scene1 />
			</Sequence>
			<Sequence from={130} durationInFrames={240}>
				<Scene2 />
			</Sequence>
			<Sequence from={350} durationInFrames={300}>
				<Scene2b />
			</Sequence>
			<Sequence from={630} durationInFrames={600}>
				<Scene3 />
			</Sequence>
			<Sequence from={1210} durationInFrames={720}>
				<Scene4 />
			</Sequence>
			<Sequence from={1910} durationInFrames={480}>
				<Scene5 />
			</Sequence>
			<Sequence from={2370} durationInFrames={540}>
				<Scene6 />
			</Sequence>
			<Sequence from={2890} durationInFrames={1200}>
				<Scene7 />
			</Sequence>
			<Sequence from={4070} durationInFrames={2400}>
				<Scene8 />
			</Sequence>
			<Sequence from={6450} durationInFrames={900}>
				<Scene9 />
			</Sequence>
		</AbsoluteFill>
	);
};
