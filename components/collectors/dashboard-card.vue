<template>
    <div>
        <a href="#" @click.prevent="$emit('clicked', {title, value, formattedTitle})" :title="'click to filter claims by '+title">
            <div class="card pull-up">
                <div class="card-content">
                    <div class="card-body">
                        <div class="media d-flex">
                            <div class="align-self-center">
                                <i :class="icon"></i>
                            </div>
                            <div class="media-body text-right">
                                <h5 class="text-muted text-bold-500 title">
                                    {{title}}
                                </h5>
                                <h3 class="text-bold-600">
                                    {{value}}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    props: ['title', 'value', 'icon', 'formattedTitle'],
}
</script>

<style scoped lang="scss">
    a:hover .title {
        text-decoration: underline;
    }
</style>