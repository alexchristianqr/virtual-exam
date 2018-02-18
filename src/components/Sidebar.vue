<template>
    <section>
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion" style="overflow-y: auto;overflow-x: hidden">
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
                <router-link :to="'/login'" class="nav-link">
                    <i class="fa fa-fw fa-dashboard"></i>
                    <span class="nav-link-text">Login</span>
                </router-link>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Reports">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#a" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-sitemap"></i>
                    <span class="nav-link-text">Themes</span>
                </a>
                <ul class="sidenav-second-level collapse" id="a">
                    <li>
                        <router-link :to="'/themes'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">All</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/create-theme'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Create</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/search-theme'" class="nav-link">
                            <i class="fa fa-fw fa-search"></i>
                            <span class="nav-link-text">Search</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Reports">
                <a class="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#b" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-file-text-o"></i>
                    <span class="nav-link-text">Questions</span>
                </a>
                <ul class="sidenav-second-level collapse" id="b">
                    <li>
                        <router-link :to="'/questions'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">All</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/create-question'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Create</span>
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="navbar-nav sidenav-toggler">
            <li class="nav-item">
                <a class="nav-link text-center" id="sidenavToggler">
                    <i class="fa fa-fw fa-bars"></i>
                </a>
            </li>
        </ul>
    </section>
</template>

<script>
    export default {
        name: "sidebar"
    }
</script>

<style scoped>

</style>