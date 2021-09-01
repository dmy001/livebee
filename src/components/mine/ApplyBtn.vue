<template>
    <div class="tail w-full h-24 flex items-center justify-center   ">
        <div class="mt-4 flex  flex-nowrap absolute ">
            <button class="w-80 h-10 text-left bg-jinbi-pur mx-auto text-white rounded-2xl">
                <span class="ml-4">${{ price }}</span>
            </button>
            <button
                class="
                    w-40
                    h-12
                    text-center
                    bg-jinbi-btn
                    text-jinbi-yel2
                    absolute
                    left-44
                    -top-1
                    bg-no-repeat
                    font-semibold
                   text-base
                "
            >
                {{ $trans('立即支付') }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        price: {
            default:0,
            type:Number
        },
        obj:{
            default:()=>{},
            type:Object
        }
    },
    data() {
        return {};
    },
    methods:{ 
    }
};
</script>