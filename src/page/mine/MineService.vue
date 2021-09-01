<template>
    <div>
        <hr />
        <p class="mt-10 ml-44 text-gray-400">13:37</p>
        <section
            class="
                bg-purple-500
                w-60
                h-14
                ml-28
                mt-4
                rounded-tl-2xl rounded-tr-md rounded-bl-2xl rounded-br-2xl
            "
        >
            <p class="inline-block mt-2 ml-2 mr-2 text-white" style="font-size: 0.88rem">
                {{ $trans('能告诉我,如何开直播吗,我想在咱这个平台直播？') }}
            </p>
        </section>

        <p class="mt-12 ml-44 text-gray-400">13:42</p>
        <section class="mt-4 flex">
            <span>
                <img
                    class="ml-5 w-11 h-11 rounded-full inline-block"
                    src="@img/mine/mine/mineService.png"
                    alt=""
                />
            </span>
            <div
                class="
                    h-10
                    w-16
                    ml-2
                    bg-gray-200
                    mt-1.5
                    rounded-tl-sm rounded-tr-3xl rounded-bl-3xl rounded-br-3xl
                "
                style="font-size: 0.88rem"
            >
                <span
                    class="inline-block w-8 h-5 mt-2.5 text-gray-800 ml-4"
                    style="font-size: 0.88rem; font-family: Helvetica; color: #554c5f"
                >
                    okay
                </span>
            </div>
        </section>
        <section
            class="
                inline-block
                w-32
                h-10
                ml-56
                mt-10
                bg-purple-500
                rounded-tl-3xl rounded-tr-md rounded-bl-3xl rounded-br-3xl
            "
        >
            <p class="mt-2 ml-4 mr-5 text-sm text-white">{{ $trans('谢谢啊,知道了') }}</p>
        </section>
        <section class="flex mt-10">
            <img
                class="ml-5 w-11 h-11 rounded-full inline-block"
                src="@img/mine/mine/mineService.png"
                alt=""
            />
            <section
                class="
                    ml-2
                    bg-gray-200
                    h-20
                    w-44
                    mt-1.5
                    rounded-tl-sm rounded-tr-3xl rounded-bl-3xl rounded-br-3xl
                "
            >
                <span>
                    <p class="ml-4 mt-4" style="font-size: 0.88rem; color: #554c5f">
                        {{ $trans('您的问题是否已解决?') }}
                    </p>
                    <button class="w-11 mt-2.5 bg-purple-500 rounded-lg text-white text-xs h-4 ml-5">
                        {{ $trans('是') }}
                    </button>
                    <button class="w-11 bg-purple-500 rounded-lg text-white text-xs h-4 ml-10">
                        {{ $trans('否') }}
                    </button>
                </span>
            </section>
        </section>
    </div>

    <!-- <div class="absolute mt-80 w-full">
    <hr class="" />
    <div class="flex">
      <input
        class="bg-gray-100 w-64 h-9"
        type="text"
        placeholder="请输入消息..."
      />
    </div>
  </div> -->
</template>

<script>
import { mapActions } from 'vuex';
export default {
    created() {
        this.showNavBar();
        this.showNavBarBg();
        this.changeNavBarTitile('客服');
    },
    methods: {
        ...mapActions('base', ['showNavBarBg', 'changeNavBarTitile', 'showNavBar']),
    },
};
</script>

<style>
/* * {
  border: 1px solid;
} */
</style>