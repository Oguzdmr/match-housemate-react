class Preferences{
     PreferencesText = async(items) => {
        if(items.length > 0){
            var preferencesText = {
                acceptableRoommatesMax : parseInt(items.preferences.acceptableRoommatesMax) === 999 ? "Farketmez": items.preferences.acceptableRoommatesMax,
                acceptableRoommatesMin:items.preferences.acceptableRoommatesMin,
                alcoholAllowed:items.preferences.alcoholAllowed === 2 ? "Tartışılabilir" : (items.preferences.alcoholAllowed === 1 ? "Evet": "Hayır"),
                budgetMax:items.preferences.budgetMax >= 100000 ? "Farketmez" : items.preferences.budgetMax.toString(),
                budgetMin:items.preferences.budgetMin.toString(),
                duration:items.preferences.duration === 2 ? "Farketmez" : (items.preferences.duration === 1 ? "Yıllık": "Dönemlik"),
                foreignersAllowed:items.preferences.foreignersAllowed === 2 ? "Tartışılabilir" : (items.preferences.foreignersAllowed === 1 ? "Evet": "Hayır"),
                genderPref:items.preferences.genderPref === 2 ? "Farketmez" : (items.preferences.genderPref === 1 ? "Kadın": "Erkek"),
                guestsAllowed:items.preferences.guestsAllowed === 2 ? "Tartışılabilir" : (items.preferences.guestsAllowed === 1 ? "Evet": "Hayır"),
                hasHome:items.preferences.hasHome  ? "Hayır" : "Evet",
                petsAllowed:items.preferences.petsAllowed === 2 ? "Tartışılabilir" : (items.preferences.petsAllowed === 1 ? "Evet": "Hayır"),
                smokingAllowed:items.preferences.smokingAllowed === 2 ? "Tartışılabilir" : (items.preferences.smokingAllowed === 1 ? "Evet": "Hayır"),
            }
    
        }else{
            var preferencesText = {}
    
        }
        
        return preferencesText;
    }
}
export default Preferences;