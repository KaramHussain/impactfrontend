<template>
    
    <div>
        <client-only>

            <template v-if="resource.length && meta.total > meta.per_page">
                <paginate
                    :page-count="totalPages"
                    :margin-pages="5"
                    :page-range="5"
                    :click-handler="handler"
                    :containerClass="'pagination justify-content-end'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                    :prev-class="'page-item'"
                    :prev-link-class="'page-link'"
                    :next-class="'page-item'"
                    :next-link-class="'page-link'" />
            </template>

        </client-only>
    </div>
</template>

<script>
export default {
    props: {
        resource: {
            required: true,
            type: Array
        },
        meta: {
            required: true,
            type: Object
        },
        totalPages: {
            required: true,
            type: Number
        },
        handler: {
            required: true,
            type: Function
        }
    }
}
</script>