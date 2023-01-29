<script>
	import { ClassTravellers, DepartureReturn, SourceDestination } from '..';
</script>

<SourceDestination />
<DepartureReturn />
<ClassTravellers />
<div>
	<label for="non-stop" class="flex justify-start items-center">
		<input
			type="checkbox"
			id="non-stop"
			class="border-0 outline-0 accent-white border border-primary rounded-md checked:accent-primary checked:text-white"
		/>
		<span class="ml-2 text-sm text-stone-600"> Show only non-stop flights</span></label
	>
	<button class="btn bg-primary text-white w-full mt-4">Search</button>
</div>
