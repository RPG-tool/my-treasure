<script>
  import '../scss/app.scss';
</script>

<header>
  Header
</header>

<slot></slot>

<footer>
  Footer
</footer>

<style type="scss">
  $my-var: #ee0000;
  footer {
    background-color: $my-var;
  }
</style>