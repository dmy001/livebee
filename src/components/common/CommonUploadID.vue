<template>
    <section>
        <div class="mt-12">
            <img class="block mx-auto w-48" :src="IDFront" alt="" />
            <CommonButton class="my-8" @click="uploadImg" title="上传证件正面" />
            <input
                type="file"
                class="no-underline hidden"
                @change="selectedImg($event, 'IDFront', 'certificateFrontImg')"
            />
        </div>
        <div class="mt-12">
            <img class="block mx-auto w-48" :src="IDBack" alt="" />
            <CommonButton class="my-8" @click="uploadImg" title="上传证件反面" />
            <input
                type="file"
                class="no-underline hidden"
                @change="selectedImg($event, 'IDBack', 'certificateBackImg')"
            />
        </div>
        <div class="mt-12">
            <img class="block mx-auto w-48" :src="IDHand" alt="" />
            <CommonButton class="my-8" @click="uploadImg" title="上传手持证件照" />
            <input
                type="file"
                class="no-underline hidden"
                @change="selectedImg($event, 'IDHand', 'certificateHandImg')"
            />
        </div>
    </section>
</template>

<script>
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';
import { getFileUploadPrivate, upLoadToQiniu } from '@api';
import { randomStrChars } from '@utils';
import CommonButton from './CommonButton.vue';
import defalutIDFront from '@img/mine/IDFront.png';
import defalutIDBack from '@img/mine/IDBack.png';
import defalutIDHand from '@img/mine/IDHand.png';
export default defineComponent({
    components: {
        CommonButton,
    },
    setup(props, ctx) {
        const state = reactive({
            // 展示用图片
            IDFront: defalutIDFront,
            IDBack: defalutIDBack,
            IDHand: defalutIDHand,
            certificateFrontImg: '',
            certificateBackImg: '',
            certificateHandImg: '',
        });
        // 点击上传按钮
        const uploadImg = e => {
            e.target.nextElementSibling.click();
        };
        // 选择完图片
        const selectedImg = async (e, target, targetUrl) => {
            const file = e.target.files[0];
            if (!file) return;
            // keyPrefix token
            const { data } = await getFileUploadPrivate();
            // key 前缀加32位随机字符串
            const inputKey = `${data.keyPrefix}${randomStrChars(32).toUpperCase()}`;
            const { key: uploadedKey } = await upLoadToQiniu(data.token, inputKey, file);
            state[target] = URL.createObjectURL(file);
            state[targetUrl] = `https://private.gagahi.com/${uploadedKey}`;
        };
        watchEffect(() => {
            const { certificateFrontImg, certificateBackImg, certificateHandImg } = state;
            const isSelected = Boolean(certificateFrontImg && certificateBackImg && certificateHandImg);
            if (!isSelected) return;
            ctx.emit('getSelectImgUrl', { certificateFrontImg, certificateBackImg, certificateHandImg });
        });
        return {
            ...toRefs(state),
            uploadImg,
            selectedImg,
        };
    },
});
</script>

