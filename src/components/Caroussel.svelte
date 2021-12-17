<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	// import '@splidejs/splide/dist/css/themes/splide-sea-green.min.css';
	// import '@splidejs/splide/dist/css/splide.min.css'; // other colors for splider
	import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css'; // other colors for splide
	const baseUrl = import.meta.env.VITE_BASE_URL;
	export let annonce;

	const videoTypes = [
		'ogm',
		'wmv',
		'mpg',
		'webm',
		'ogv',
		'mov',
		'asx',
		'mpeg',
		'mp4',
		'm4v',
		'avi'
	];
	// const imgTypes = ['tiff','pjp',	'jfif','bmp','gif',	'svg','png',	'xbm','dib',	'jxl','jpeg','svgz','jpg',	'webp','ico','tif','pjpeg','avif' ];
</script>

<div class="photosAnnonce">
	<Splide
		options={{
			rewind: true,
			autoplay: true,
			pauseOnHover: true,
			arrows: 'slider',
			gap: '1rem',
			type: 'loop', // slide or loop or fade -> animations
			focus: 'center'
		}}
		hasSliderWrapper
	>
		{#each annonce.urlPhoto as media}
			<SplideSlide>
				{#if videoTypes.includes(media.split('.')[1])}
					<!-- if it's a video -->
					<!-- svelte-ignore a11y-media-has-caption -->
					<figure class="image is-3by2">
						<video
							controls
							class="has-ratio"
							src="{baseUrl}/medias/{media}"
							frameborder="0"
							allowfullscreen
						/>
					</figure>
				{:else}
					<figure class="image is-3by2">
						<img src="{baseUrl}/medias/{media}" alt="imgs de l'annonce" />
					</figure>
				{/if}
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	.photosAnnonce {
		margin-bottom: 500px;
	}
</style>
