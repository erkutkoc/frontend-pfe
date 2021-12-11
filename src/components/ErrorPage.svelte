<script>
	export let message;
	export let content;
	export let link;
    export let linkValue;
</script>

<section class="hero is-danger" id="error">
	<div class="hero-body">
		{#if message != null}
			<p class="title" id="text">{message}</p>
		{/if}
		{#if content != null}
			<div class="content" id="text">
				{content}
			</div>
		{/if}
        {#if link != null && linkValue == null}
        <div id="text">
			<a href={link} id="text">cliquer ici</a>
        </div>
		{/if}
        {#if link != null && linkValue != null}
        <div id="text">
			<a href={link} id="text">{linkValue}</a>
        </div>
		{/if}

	</div>
</section>

<style>
	/*h3 {
		color: red;
		font-weight: bold;
		font-size: xx-large;
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-right: -50%;
		transform: translate(-50%, -50%);
    }*/
	#error {
		margin: auto;
	}
	.content {
		margin: 5%;
	}
    #text {
        text-align: center;
    }
    a{font-size:20px}
</style>
