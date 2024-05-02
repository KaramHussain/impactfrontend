<template>
  <main>
    <p>Average days to collect money: 21</p>

    <div class="card bucket">

      <div class="card-body bucket__wrapper p-0">

        <div class="left">
          <i class="la la-bitbucket info-header-icon"></i>
          <p class="bucket-title">Bucket</p>
        </div>

        <div class="right">
          <p>Outstanding Charges: <p>
          <p>Outstanding Line Items: </p>
        </div>

      </div>

    </div>


  </main>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .bucket {
    width:70%;
    float:right;

    &::after {
      float:none;
      clear:both;
    }

    &__wrapper {
      display:flex;
    }

    &-title {
      font-family:inherit;
      color:#000;
      font-weight: 700;
    }

    .left {
      flex-grow: 1;
      border-right:1px solid #000;

      i {
        font-size: 4rem;
        color:#000;
      }
    }

    .right {
      flex-grow: 2;
      align-self: center;
    }

    .left, .right {
      padding:10px;
      text-align:center;
    }

  }
</style>
