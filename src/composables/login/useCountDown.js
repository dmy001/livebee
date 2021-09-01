import { reactive ,onUnmounted} from 'vue';
export const useCountDown = () => {     
    const state = reactive({
        sendTime: 60,
        sendCode:true,
        timer:0,
        
    });
    const clickTime =()=>{
        debugger
        state.sendCode = false;
        state.timer = setInterval(() => {
            state.sendTime--;
            if (state.sendTime < 0) {
                state.sendCode = true;
                clearInterval(state.timer);
                 state.sendTime = 60; 
            }
        }, 1000);
    }
    onUnmounted(()=>{
        clearInterval(state.timer);
    })
   
    return {
        countDownState: state,
        clickTime
    }
}
