export function handleCases(preferences) {
    if (preferences.background_color === "dark" && preferences.text_size === "13" && preferences.contrast === "1") {
        return "gray";
    }
    if (preferences.background_color === "dark" && preferences.text_size === "12" && preferences.contrast === "1") {
        return "gray graySF";
    } 
    if (preferences.background_color === "dark" && preferences.text_size === "14" && preferences.contrast === "1") {
        return "gray grayBF";
    } 

    if (preferences.background_color === "dark" && preferences.text_size === "13" && preferences.contrast === "0.9") {
        return "gray grayNC";
    }
    if (preferences.background_color === "dark" && preferences.text_size === "12" && preferences.contrast === "0.9") {
        return "gray graySF grayNC";
    } 
    if (preferences.background_color === "dark" && preferences.text_size === "14" && preferences.contrast === "0.9") {
        return "gray grayBF grayNC";
    } 
    if (preferences.background_color === "dark" && preferences.text_size === "13" && preferences.contrast === "0.8") {
        return "gray grayLC";
    }
    if (preferences.background_color === "dark" && preferences.text_size === "12" && preferences.contrast === "0.8") {
        return "gray graySF grayLC";
    } 
    if (preferences.background_color === "dark" && preferences.text_size === "14" && preferences.contrast === "0.8") {
        return "gray grayBF grayLC";
    }  

    //white 
    if (preferences.background_color === "light" && preferences.text_size === "13" && preferences.contrast === "1") {
        return "";
    }
    if (preferences.background_color === "light" && preferences.text_size === "12" && preferences.contrast === "1") {
        return "whiteSF";
    } 
    if (preferences.background_color === "light" && preferences.text_size === "14" && preferences.contrast === "1") {
        return "whiteBF";
    } 

    if (preferences.background_color === "light" && preferences.text_size === "13" && preferences.contrast === "0.9") {
        return "whiteNC";
    }
    if (preferences.background_color === "light" && preferences.text_size === "12" && preferences.contrast === "0.9") {
        return "whiteSF whiteNC";
    } 
    if (preferences.background_color === "light" && preferences.text_size === "14" && preferences.contrast === "0.9") {
        return "whiteBF whiteNC";
    } 

    if (preferences.background_color === "light" && preferences.text_size === "13" && preferences.contrast === "0.8") {
        return "whiteLC";
    }
    if (preferences.background_color === "light" && preferences.text_size === "12" && preferences.contrast === "0.8") {
        return "whiteSF whiteLC";
    } 
    if (preferences.background_color === "light" && preferences.text_size === "14" && preferences.contrast === "0.8") {
        return "whiteBF whiteLC";
    }  
    return "";
}