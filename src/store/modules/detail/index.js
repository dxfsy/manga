import { detailList } from "../../../api/comic";

const state = {
    detailData: null
};
const mutations = {
    set_Detail_Data(state, detailData) {
        state.detailData = detailData;
    },

};
const actions = {
    async setDetailData({ commit }, comicId) {
        let detailData = await detailList({ comicId });
        if (detailData && detailData.data && detailData.data.data) {
            detailData = detailData.data.data;
            return commit('set_Detail_Data', detailData);
        } else {
            return -1;
        }

    },

};
const getters = {
    detailInfo(state) {
        if(state.detailData==null) return null
        let { author, coverUrl, comicName, label, state: status, content } = state.detailData
        return { author, coverUrl, comicName, label, status, content }
    },
    chapterList(state) {
        if(state.detailData==null) return null
        let { updateTime, chapterList } = state.detailData
        return { updateTime, chapterList }
    }

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}