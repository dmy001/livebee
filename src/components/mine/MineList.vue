<template>
    <div class="btm w-full px-3 max-w-xl">
        <ul>
            <!-- <router-link to="/mine/mineIncome">
        <li class="flex mt-6 " >
          <img class="w-8  "  src="@img/mine/mine/wallet@2x.png" alt="" />
          <p class=" text-common-grey1 ">{{$trans('我的收益')}}</p>
          <img
            class="w-6  h-6 ml-auto"
            src="@img/mine/mine/mineArr@2x.png"
            alt=""
          />
        </li>
      </router-link> -->
            <router-link to="/mine/mineVisitor">
                <li class="flex mt-3 py-4 items-center">
                    <img class="w-6 mx-4" src="@img/mine/mine/account_security-2@2x.png" alt="" />
                    <p class="text-common-grey1">{{ $trans('我的访客') }}</p>
                    <img class="w-6  ml-auto" src="@img/mine/mine/mineArr@2x.png" alt="" />
                </li>
            </router-link>
            <router-link to="/mine/mineBindId">
                <li class="flex py-4 items-center">
                    <img class="w-6 mx-4" src="@img/mine/mine/Accessibility-2@2x.png" alt="" />
                    <p class="text-common-grey1">{{ $trans('绑定账号') }}</p>
                    <img class="w-6  ml-auto" src="@img/mine/mine/mineArr@2x.png" alt="" />
                </li>
            </router-link>
            <router-link to="/mine/mineSet">
                <li class="flex py-4 items-center">
                    <img class="w-6 mx-4 " src="@img/mine/mine/mineIcon9.png" alt="" />
                    <p class="text-common-grey1">{{ $trans('设置') }}</p>
                    <img class="w-6  ml-auto" src="@img/mine/mine/mineArr@2x.png" alt="" />
                </li>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {};
</script>
