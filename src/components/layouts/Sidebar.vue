<template>
    <div>
        <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
            <li class="nav-item" title="Modulo Temas">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#a" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-sitemap"></i>
                    <span class="nav-link-text">Tema</span>
                </a>
                <ul class="sidenav-second-level collapse" id="a">
                    <li>
                        <router-link :to="'/themes'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/create-theme'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" title="Modulo Preguntas">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#b" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-file-text-o"></i>
                    <span class="nav-link-text">Pregunta</span>
                </a>
                <ul class="sidenav-second-level collapse" id="b">
                    <li>
                        <router-link :to="'/questions'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/create-question'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" title="Modulo Respuestas">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#c" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-check-square"></i>
                    <span class="nav-link-text">Opcion Respuesta</span>
                </a>
                <ul class="sidenav-second-level collapse" id="c">
                    <li>
                        <router-link :to="'/options-answers'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="'/create-option-answer'" class="nav-link">
                            <i class="fa fa-fw fa-plus"></i>
                            <span class="nav-link-text">Crear</span>
                        </router-link>
                    </li>
                </ul>
            </li>
            <li class="nav-item" title="Modulo Usuarios">
                <a class="nav-link nav-link-collapse" data-toggle="collapse" href="#d" data-parent="#exampleAccordion">
                    <i class="fa fa-fw fa-users"></i>
                    <span class="nav-link-text">Usuarios</span>
                </a>
                <ul class="sidenav-second-level collapse" id="d">
                    <li>
                        <router-link :to="'/users'" class="nav-link">
                            <i class="fa fa-fw fa-list-alt"></i>
                            <span class="nav-link-text">Listar</span>
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
    </div>
</template>

<script>

    export default {
        name: "Sidebar",
    }
</script>

<style scoped>
#exampleAccordion{
    overflow: overlay;
}
#mainNav .navbar-collapse .navbar-sidenav .nav-link-collapse:after{
    padding-right: 8px;
}








/**
* Demo styles
* Not needed for tooltips to work
*/

/* `border-box`... ALL THE THINGS! */
html {
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

body {
    margin: 64px auto;
    text-align: center;
    font-size: 100%;
    max-width: 640px;
    width: 94%;
}

a:hover {
    text-decoration: none;
}

header,
.demo,
.demo p {
    margin: 4em 0;
    text-align: center;
}

/**
 * Tooltip Styles
 */

/* Base styles for the element that has a tooltip */
[data-tooltip],
.tooltip {
    position: relative;
    cursor: pointer;
}

/* Base styles for the entire tooltip */
[data-tooltip]:before,
[data-tooltip]:after,
.tooltip:before,
.tooltip:after {
    position: absolute;
    visibility: hidden;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    opacity: 0;
    -webkit-transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out,
            -webkit-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    -moz-transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out,
            -moz-transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    transition:
            opacity 0.2s ease-in-out,
            visibility 0.2s ease-in-out,
            transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform:    translate3d(0, 0, 0);
    transform:         translate3d(0, 0, 0);
    pointer-events: none;
}

/* Show the entire tooltip on hover and focus */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after,
[data-tooltip]:focus:before,
[data-tooltip]:focus:after,
.tooltip:hover:before,
.tooltip:hover:after,
.tooltip:focus:before,
.tooltip:focus:after {
    visibility: visible;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
    opacity: 1;
}

/* Base styles for the tooltip's directional arrow */
.tooltip:before,
[data-tooltip]:before {
    z-index: 1001;
    border: 6px solid transparent;
    background: transparent;
    content: "";
}

/* Base styles for the tooltip's content area */
.tooltip:after,
[data-tooltip]:after {
    z-index: 1000;
    padding: 8px;
    width: 160px;
    background-color: #000;
    background-color: hsla(0, 0%, 20%, 0.9);
    color: #fff;
    content: attr(data-tooltip);
    font-size: 14px;
    line-height: 1.2;
}

/* Directions */

/* Top (default) */
[data-tooltip]:before,
[data-tooltip]:after,
.tooltip:before,
.tooltip:after,
.tooltip-top:before,
.tooltip-top:after {
    bottom: 100%;
    left: 50%;
}

[data-tooltip]:before,
.tooltip:before,
.tooltip-top:before {
    margin-left: -6px;
    margin-bottom: -12px;
    border-top-color: #000;
    border-top-color: hsla(0, 0%, 20%, 0.9);
}

/* Horizontally align top/bottom tooltips */
[data-tooltip]:after,
.tooltip:after,
.tooltip-top:after {
    margin-left: -80px;
}

[data-tooltip]:hover:before,
[data-tooltip]:hover:after,
[data-tooltip]:focus:before,
[data-tooltip]:focus:after,
.tooltip:hover:before,
.tooltip:hover:after,
.tooltip:focus:before,
.tooltip:focus:after,
.tooltip-top:hover:before,
.tooltip-top:hover:after,
.tooltip-top:focus:before,
.tooltip-top:focus:after {
    -webkit-transform: translateY(-12px);
    -moz-transform:    translateY(-12px);
    transform:         translateY(-12px);
}

/* Left */
.tooltip-left:before,
.tooltip-left:after {
    right: 100%;
    bottom: 50%;
    left: auto;
}

.tooltip-left:before {
    margin-left: 0;
    margin-right: -12px;
    margin-bottom: 0;
    border-top-color: transparent;
    border-left-color: #000;
    border-left-color: hsla(0, 0%, 20%, 0.9);
}

.tooltip-left:hover:before,
.tooltip-left:hover:after,
.tooltip-left:focus:before,
.tooltip-left:focus:after {
    -webkit-transform: translateX(-12px);
    -moz-transform:    translateX(-12px);
    transform:         translateX(-12px);
}

/* Bottom */
.tooltip-bottom:before,
.tooltip-bottom:after {
    top: 100%;
    bottom: auto;
    left: 50%;
}

.tooltip-bottom:before {
    margin-top: -12px;
    margin-bottom: 0;
    border-top-color: transparent;
    border-bottom-color: #000;
    border-bottom-color: hsla(0, 0%, 20%, 0.9);
}

.tooltip-bottom:hover:before,
.tooltip-bottom:hover:after,
.tooltip-bottom:focus:before,
.tooltip-bottom:focus:after {
    -webkit-transform: translateY(12px);
    -moz-transform:    translateY(12px);
    transform:         translateY(12px);
}

/* Right */
.tooltip-right:before,
.tooltip-right:after {
    bottom: 50%;
    left: 100%;
}

.tooltip-right:before {
    margin-bottom: 0;
    margin-left: -12px;
    border-top-color: transparent;
    border-right-color: #000;
    border-right-color: hsla(0, 0%, 20%, 0.9);
}

.tooltip-right:hover:before,
.tooltip-right:hover:after,
.tooltip-right:focus:before,
.tooltip-right:focus:after {
    -webkit-transform: translateX(12px);
    -moz-transform:    translateX(12px);
    transform:         translateX(12px);
}

/* Move directional arrows down a bit for left/right tooltips */
.tooltip-left:before,
.tooltip-right:before {
    top: 3px;
}

/* Vertically center tooltip content for left/right tooltips */
.tooltip-left:after,
.tooltip-right:after {
    margin-left: 0;
    margin-bottom: -16px;
}

</style>