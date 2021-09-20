import {GameAnalytics} from 'gameanalytics'

GameAnalytics.configureBuild("1.0.0");
GameAnalytics.initialize("f05ee11ad1c3e9ce84b13f8fa38e579c", "3e0647c44a58347b3cbee90d5ced51a58e500fa9");

export const getBusinessEvent  = (amount, id) => {
    try{
        GameAnalytics.addBusinessEvent("RUB", amount, "tips", id, "Shop");
    }catch(e){}
}