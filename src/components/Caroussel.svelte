<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
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
					<div class="card-image">
						<figure class="image is-5by3">
							<!-- svelte-ignore a11y-media-has-caption -->
							<video controls src="{baseUrl}/medias/{media}" class="bg-gray-100 rounded-lg" />
						</figure>
					</div>
				{:else}
					<figure class="image is-5by3">
						<img
							src="{baseUrl}/medias/{media}"
							alt="imgs de l'annonce"
							class="bg-gray-100 rounded-lg"
						/>
					</figure>
				{/if}
			</SplideSlide>
		{/each}
	</Splide>
</div>

<style>
	.photosAnnonce,
	.card-image {
		margin-bottom: 500px;
	}
</style>
