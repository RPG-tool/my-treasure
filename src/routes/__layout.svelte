<script>
  /* CSS */
  import '../scss/app.scss';
</script>

<!-- <header>
  Test header
</header> -->

<slot></slot>

<footer class="mt-16">
  <p>
    My treasure, RPG Treasure / loot generator by Carlos Cabo (<a href="https://twitter.com/putuko">@putuko</a>). <span id="version-txt">v0.1-alpha</span>. <a href="https://github.com/RPG-tool/my-treasure">Source code @ GitHub</a>
  </p>
</footer>

<style type="scss">
  footer {
    font-size: 16px;
    color: #333;
  }
  // $my-var: #ee0000;
  // footer {
  //   background-color: $my-var;
  // }
</style>