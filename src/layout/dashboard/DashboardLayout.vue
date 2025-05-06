<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/admin/fichaclinica"
          name="Crear Ficha Clinica"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/admin/verfichasclinicas"
          name="Ver Fichas Clnicas"
          icon="tim-icons icon-atom"
        />
        <sidebar-link
          to="/maps"
          name="Modificar Fichas clinicas"
          icon="tim-icons icon-pin"
        />
        <sidebar-link
          to="/maps"
          name="Gestión de Roles"
          icon="tim-icons icon-pin"
        />

      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss"></style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
