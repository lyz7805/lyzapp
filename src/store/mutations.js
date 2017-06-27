export default {
  loginIn (state) {
    state.isLogin = true
  },
  loginOut (state) {
    state.isLogin = false
  },
  setScwlxx (state, scwlxx) {
    state.scwlxx = scwlxx
  },
  setScbom (state, scbom) {
    state.scbom = scbom
  },
  setSccpqd (state, sccpqd) {
    state.sccpqd = sccpqd
  }
}
