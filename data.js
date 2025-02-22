//data.js




//备选项字典
export const shiftOptionsGroups = {
//  DEPOT 按钮 1 (例如 Greerton) -  正常情况 (School Holiday 开关 关闭)
"depot1": {
"weekday": ["OFF", "T26301T", "T26302T", "T26303T", "T26304T", "T26305T", "T26306T", "T26307T", "T26308T", "T26309T", "T26310T", "T26311T", "T26312T", "T26313T", "T26314T", "T26315T", "T26316T", "T26317T", "T26318T", "T26319T", "T26320T", "T26321T", "T26322T", "T26323T", "T26324T", "T26325T", "T26326T", "T26327T", "T26328T", "T26329T", "T26330T", "T26331T", "T26332T", "T26333T", "T26334T", "T26335T", "T26336T", "T26338T", "T26340T", "T26501T", "T26502T", "T26503T", "T26504T", "T26505T", "T26506T", "T26507T", "T26508T", "T26509T", "T26510T", "T26511T", "T26512T", "T26513T", "T26514T", "T26515T", "T26516T", "T26517T", "T26518T", "T26519T", "T26520T", "T26521T", "T26522T", "T26523T", "T26524T", "T26525T"], // B1 组备选项 (周一到周五)
"weekend": ["OFF", "T26701", "T26702", "T26703", "T26704", "T26705", "T26706", "T26707", "T26709", "T26711", "T26713", "T26715", "T26717", "T26719", "T26721", "T26723", "T26725", "T26727", "T26729", "T26731", "T26733", "T26735", "T26737", "T26739", "T26741", "T26743", "T26745", "T26747", "T26801", "T26802", "T26803", "T26804", "T26805", "T26806", "T26807", "T26808", "T26810"]  // A1 组备选项 (周六和周日)
},
//  DEPOT 按钮 1 (例如 Greerton) -  School Holiday 开启情况
"depot1-schoolHoliday": {
"weekday": ["T26301H", "T26302H", "T26303H", "T26304H", "T26306H", "T26307H", "T26308H", "T26309H", "T26310H", "T26311H", "T26312H", "T26313H", "T26314H", "T26316H", "T26317H", "T26318H", "T26319H", "T26320H", "T26321H", "T26322H", "T26323H", "T26326H", "T26327H", "T26328H", "T26329H", "T26330H", "T26332H", "T26334H", "T26336H", "T26338H", "T26501H", "T26502H", "T26503H", "T26504H", "T26505H", "T26506H", "T26507H", "T26508H", "T26509H", "T26510H", "T26511H", "T26512H", "T26513H", "T26514H", "T26515H", "T26516H", "T26517H", "T26518H", "T26519H", "T26520H", "T26521H", "T26522H"], // SHB1 组备选项 (周一到周五)
"weekend": ["OFF", "T26701", "T26702", "T26703", "T26704", "T26705", "T26706", "T26707", "T26709", "T26711", "T26713", "T26715", "T26717", "T26719", "T26721", "T26723", "T26725", "T26727", "T26729", "T26731", "T26733", "T26735", "T26737", "T26739", "T26741", "T26743", "T26745", "T26747", "T26801", "T26802", "T26803", "T26804", "T26805", "T26806", "T26807", "T26808", "T26810"]// SHA1 组备选项 (周六和周日)
},

//  DEPOT 按钮 2 (例如 Papamoa) -  正常情况 (School Holiday 开关 关闭)
"depot2": {
"weekday": ["OFF", "T28301T", "T28302T", "T28303T", "T28304T", "T28305T", "T28307T", "T28309T", "T28311T", "T28313T", "T28315T", "T28317T", "T28501T", "T28502T", "T28503T", "T28504T", "T28505T", "T28506T", "T28507T", "T28400T", "T28401T", "T28402T", "T28403T", "T28404T", "T28405T"], // B2 组备选项 (周一到周五)
"weekend": ["OFF", "T28701", "T28702", "T28703", "T28704", "T28705", "T28707", "T28709", "T28711", "T28713", "T28802", "T28804", "T28806", "T28808"]  // A2 组备选项 (周六和周日)
},
//  DEPOT 按钮 2 (例如 Papamoa) -  School Holiday 开启情况
"depot2-schoolHoliday": {
"weekday": ["T28301H", "T28302H", "T28303H", "T28304H", "T28305H", "T28306H", "T28307H", "T28309H", "T28311H", "T28313H", "T28315H", "T28501H", "T28502H", "T28503H", "T28504H", "T28505H", "T28506H", "T28507H", "T28508H"], // SHB2 组备选项 (周一到周五)
"weekend": ["OFF", "T28701", "T28702", "T28703", "T28704", "T28705", "T28707", "T28709", "T28711", "T28713", "T28802", "T28804", "T28806", "T28808"]// SHA2 组备选项 (周六和周日)
},

//  DEPOT 按钮 3 (例如 Maleme) -  正常情况 (School Holiday 开关 关闭)
"depot3": {
"weekday": ["OFF", "T27301T", "T27303T", "T27305T", "T27307T", "T27309T", "T27311T", "T27313T", "T27315T", "T27317T", "T27319T", "T27321T", "T27323T", "T27325T", "T27327T", "T27329T", "T27331T", "T27333T", "T27335T", "T27337T", "T27339T", "T27341T", "T27343T", "T27345T", "T27347T", "T27349T", "T27351T", "T27353T", "T27355T", "T27357T", "T27359T", "T27361T", "T27362T", "T27363T", "T27364T", "T27365T"], // B3 组备选项 (周一到周五)
"weekend": ["OFF"]  // A3 组备选项 (周六和周日)
},
//  DEPOT 按钮 3 (例如 Maleme) -  School Holiday 开启情况
"depot3-schoolHoliday": {
"weekday": ["OFF"], // SHB3 组备选项 (周一到周五)
"weekend": ["OFF"]// SHA3 组备选项 (周六和周日)
}
};


//班次详细信息字典 单号 时间段1 时间段2 用餐地点 用餐时间
export const shiftDetailsDictionary = {


    "": {"timeRanges": [],"mealLocation": "无","mealTime": "无"},
    "OFF": {"timeRanges": [],"mealLocation": "无","mealTime": "无"},
    
    
    "T28301T": {"timeRanges": ["05:41-14:57"],"mealLocation": "TAURANGA CBD","mealTime": "56 minutes"},
    "T28301T": {"timeRanges": ["05:41-14:57"],"mealLocation": "TAURANGA CBD","mealTime": "56 minutes"},
    "T28302T": {"timeRanges": ["11:29-21:27"],"mealLocation": "TAURANGA CBD","mealTime": "41 minutes"},
    "T28303T": {"timeRanges": ["06:11-15:53"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T28304T": {"timeRanges": ["11:45-21:10"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
    "T28305T": {"timeRanges": ["06:14-16:13"],"mealLocation": "TAURANGA CBD","mealTime": "31 minutes"},
    "T28307T": {"timeRanges": ["06:29-16:27"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
    "T28309T": {"timeRanges": ["06:39-16:16"],"mealLocation": "TAURANGA CBD","mealTime": "58 minutes"},
    "T28311T": {"timeRanges": ["06:41-16:36"],"mealLocation": "TAURANGA CBD","mealTime": "50 minutes"},
    "T28313T": {"timeRanges": ["07:04-16:26"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
    "T28315T": {"timeRanges": ["07:16-16:57"],"mealLocation": "TAURANGA CBD","mealTime": "54 minutes"},
    "T28317T": {"timeRanges": ["07:20-17:02"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
    
    
    "T28701": {"timeRanges": ["05:44-16:16"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
    "T28702": {"timeRanges": ["10:01-20:56"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    "T28703": {"timeRanges": ["06:11-17:56"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T28704": {"timeRanges": ["11:46-21:52"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
    "T28705": {"timeRanges": ["06:44-18:39"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T28707": {"timeRanges": ["07:11-18:56"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T28709": {"timeRanges": ["07:22-19:21"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T28711": {"timeRanges": ["08:22-19:56"],"mealLocation": "TAURANGA CBD","mealTime": "49 minutes"},
    "T28713": {"timeRanges": ["08:45-20:13"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    
    
    "T28802": {"timeRanges": ["11:44-20:35"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T28804": {"timeRanges": ["11:49-20:25"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T28806": {"timeRanges": ["12:22-20:36"],"mealLocation": "TAURANGA CBD","mealTime": "49 minutes"},
    "T28808": {"timeRanges": ["12:46-21:04"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    
    
    "T26301T": {"timeRanges": ["05:34-14:10"],"mealLocation": "TAURANGA CBD","mealTime": "32 minutes"},
    "T26302T": {"timeRanges": ["10:34-19:52"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26303T": {"timeRanges": ["05:40-15:06"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T26304T": {"timeRanges": ["10:38-20:35"],"mealLocation": "TAURANGA CBD","mealTime": "48 minutes"},
    "T26305T": {"timeRanges": ["05:34-14:24"],"mealLocation": "GREERTON DEPOT","mealTime": "43 minutes"},
    "T26306T": {"timeRanges": ["10:39-19:44"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
    "T26307T": {"timeRanges": ["05:42-15:14"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26308T": {"timeRanges": ["10:44-20:40"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
    "T26309T": {"timeRanges": ["05:45-14:44"],"mealLocation": "TAURANGA CBD","mealTime": "57 minutes"},
    "T26310T": {"timeRanges": ["10:51-20:44"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T26311T": {"timeRanges": ["05:53-14:56"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26312T": {"timeRanges": ["10:59-20:48"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26313T": {"timeRanges": ["05:58-15:43"],"mealLocation": "TAURANGA CBD","mealTime": "32 minutes"},
    "T26314T": {"timeRanges": ["11:05-20:54"],"mealLocation": "TAURANGA CBD","mealTime": "44 minutes"},
    "T26315T": {"timeRanges": ["06:00-15:56"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T26316T": {"timeRanges": ["11:08-21:08"],"mealLocation": "TAURANGA CBD","mealTime": "43 minutes"},
    "T26317T": {"timeRanges": ["06:02-15:57"],"mealLocation": "TAURANGA CBD","mealTime": "51 minutes"},
    "T26318T": {"timeRanges": ["11:09-21:02"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
    "T26319T": {"timeRanges": ["06:14-15:11"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
    "T26320T": {"timeRanges": ["11:09-21:09"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26321T": {"timeRanges": ["06:19-16:14"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26322T": {"timeRanges": ["11:19-21:14"],"mealLocation": "TAURANGA CBD","mealTime": "37 minutes"},
    "T26323T": {"timeRanges": ["06:39-16:23"],"mealLocation": "TAURANGA CBD","mealTime": "47 minutes"},
    "T26324T": {"timeRanges": ["11:19-21:18"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
    "T26325T": {"timeRanges": ["06:45-16:33"],"mealLocation": "TAURANGA CBD","mealTime": "44 minutes"},
    "T26326T": {"timeRanges": ["11:34-21:25"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26327T": {"timeRanges": ["06:55-16:49"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
    "T26328T": {"timeRanges": ["11:38-21:30"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T26329T": {"timeRanges": ["06:56-16:46"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    "T26330T": {"timeRanges": ["11:39-21:29"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    "T26331T": {"timeRanges": ["06:59-16:44"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26332T": {"timeRanges": ["11:51-21:35"],"mealLocation": "TAURANGA CBD","mealTime": "31 minutes"},
    "T26333T": {"timeRanges": ["06:59-16:59"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
    "T26334T": {"timeRanges": ["11:59-21:55"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
    "T26335T": {"timeRanges": ["07:09-16:56"],"mealLocation": "TAURANGA CBD","mealTime": "48 minutes"},
    "T26336T": {"timeRanges": ["12:19-21:44"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
    "T26338T": {"timeRanges": ["13:10-21:48"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26340T": {"timeRanges": ["13:34-22:25"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
    
    
    "T26701": {"timeRanges": ["05:37-15:37"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    "T26702": {"timeRanges": ["09:10-20:25"],"mealLocation": "TAURANGA CBD","mealTime": "50 minutes"},
    "T26703": {"timeRanges": ["05:47-15:51"],"mealLocation": "GREERTON DEPOT","mealTime": "41 minutes"},
    "T26704": {"timeRanges": ["09:34-20:35"],"mealLocation": "GREERTON DEPOT","mealTime": "31 minutes"},
    "T26705": {"timeRanges": ["05:53-16:25"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T26706": {"timeRanges": ["09:53-20:55"],"mealLocation": "GREERTON DEPOT","mealTime": "41 minutes"},
    "T26707": {"timeRanges": ["05:53-16:34"],"mealLocation": "TAURANGA CBD","mealTime": "55 minutes"},
    "T26709": {"timeRanges": ["05:54-16:41"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    "T26711": {"timeRanges": ["06:01-17:20"],"mealLocation": "GREERTON DEPOT","mealTime": "46 minutes"},
    "T26713": {"timeRanges": ["06:02-17:10"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26715": {"timeRanges": ["06:08-17:45"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26717": {"timeRanges": ["06:14-17:48"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26719": {"timeRanges": ["06:19-17:59"],"mealLocation": "GREERTON DEPOT","mealTime": "45 minutes"},
    "T26721": {"timeRanges": ["06:35-18:18"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26723": {"timeRanges": ["06:46-18:25"],"mealLocation": "PAPAMOA DEPOT","mealTime": "53 minutes"},
    "T26725": {"timeRanges": ["06:52-18:50"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T26727": {"timeRanges": ["07:23-18:45"],"mealLocation": "TAURANGA CBD","mealTime": "56 minutes"},
    "T26729": {"timeRanges": ["07:25-19:24"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26731": {"timeRanges": ["07:52-19:36"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T26733": {"timeRanges": ["08:05-19:27"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
    "T26735": {"timeRanges": ["08:10-19:38"],"mealLocation": "TAURANGA CBD","mealTime": "59 minutes"},
    "T26737": {"timeRanges": ["08:11-19:48"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
    "T26739": {"timeRanges": ["08:15-20:10"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T26741": {"timeRanges": ["08:22-20:01"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T26743": {"timeRanges": ["08:41-19:55"],"mealLocation": "TAURANGA CBD","mealTime": "54 minutes"},
    "T26745": {"timeRanges": ["08:46-20:18"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26747": {"timeRanges": ["09:00-20:57"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    
    
    "T26801": {"timeRanges": ["05:42-14:21"],"mealLocation": "TAURANGA CBD","mealTime": "42 minutes"},
    "T26802": {"timeRanges": ["11:22-20:20"],"mealLocation": "GREERTON DEPOT","mealTime": "1 hour"},
    "T26803": {"timeRanges": ["05:45-13:49"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T26804": {"timeRanges": ["12:00-20:54"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26805": {"timeRanges": ["06:24-14:54"],"mealLocation": "TAURANGA CBD","mealTime": "36 minutes"},
    "T26806": {"timeRanges": ["12:23-20:48"],"mealLocation": "TAURANGA CBD","mealTime": "59 minutes"},
    "T26807": {"timeRanges": ["06:27-15:21"],"mealLocation": "TAURANGA CBD","mealTime": "1 hour"},
    "T26808": {"timeRanges": ["12:53-21:16"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
    "T26810": {"timeRanges": ["13:22-21:02"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
    
    
    "T26301H": {"timeRanges": ["05:30-15:10"],"mealLocation": "TAURANGA CBD","mealTime": "34 minutes"},
    "T26302H": {"timeRanges": ["09:39-19:27"],"mealLocation": "TAURANGA CBD","mealTime": "37 minutes"},
    "T26303H": {"timeRanges": ["05:34-14:31"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26304H": {"timeRanges": ["09:44-19:36"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T26306H": {"timeRanges": ["10:08-20:08"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26307H": {"timeRanges": ["05:45-15:14"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26308H": {"timeRanges": ["10:21-20:21"],"mealLocation": "TAURANGA CBD","mealTime": "44 minutes"},
    "T26309H": {"timeRanges": ["05:46-14:44"],"mealLocation": "TAURANGA CBD","mealTime": "42 minutes"},
    "T26310H": {"timeRanges": ["10:24-20:24"],"mealLocation": "TAURANGA CBD","mealTime": "37 minutes"},
    "T26311H": {"timeRanges": ["05:52-15:50"],"mealLocation": "TAURANGA CBD","mealTime": "40 minutes"},
    "T26312H": {"timeRanges": ["10:51-20:48"],"mealLocation": "TAURANGA CBD","mealTime": "60 minutes"},
    "T26313H": {"timeRanges": ["05:58-15:57"],"mealLocation": "TAURANGA CBD","mealTime": "47 minutes"},
    "T26314H": {"timeRanges": ["10:59-20:55"],"mealLocation": "TAURANGA CBD","mealTime": "32 minutes"},
    "T26316H": {"timeRanges": ["11:08-21:05"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26317H": {"timeRanges": ["05:51-15:59"],"mealLocation": "Greerton Depot","mealTime": "34 minutes"},
    "T26318H": {"timeRanges": ["11:14-21:02"],"mealLocation": "TAURANGA CBD","mealTime": "35 minutes"},
    "T26319H": {"timeRanges": ["06:17-15:58"],"mealLocation": "TAURANGA CBD","mealTime": "36 minutes"},
    "T26320H": {"timeRanges": ["11:14-21:14"],"mealLocation": "TAURANGA CBD","mealTime": "46 minutes"},
    "T26321H": {"timeRanges": ["06:10-16:00"],"mealLocation": "TAURANGA CBD","mealTime": "54 minutes"},
    "T26322H": {"timeRanges": ["11:19-21:09"],"mealLocation": "TAURANGA CBD","mealTime": "60 minutes"},
    "T26323H": {"timeRanges": ["06:16-16:11"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26326H": {"timeRanges": ["11:34-21:30"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26327H": {"timeRanges": ["06:08-16:38"],"mealLocation": "TAURANGA CBD","mealTime": "33 minutes"},
    "T26328H": {"timeRanges": ["11:38-21:29"],"mealLocation": "TAURANGA CBD","mealTime": "41 minutes"},
    "T26329H": {"timeRanges": ["06:42-16:41"],"mealLocation": "TAURANGA CBD","mealTime": "36 minutes"},
    "T26330H": {"timeRanges": ["11:39-21:35"],"mealLocation": "TAURANGA CBD","mealTime": "39 minutes"},
    "T26332H": {"timeRanges": ["11:59-21:44"],"mealLocation": "TAURANGA CBD","mealTime": "44 minutes"},
    "T26334H": {"timeRanges": ["12:04-21:55"],"mealLocation": "TAURANGA CBD","mealTime": "43 minutes"},
    "T26336H": {"timeRanges": ["12:09-21:48"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    "T26338H": {"timeRanges": ["12:34-22:25"],"mealLocation": "TAURANGA CBD","mealTime": "45 minutes"},
    
    
    "T28301H": {"timeRanges": ["05:29-15:14"],"mealLocation": "TAURANGA CBD","mealTime": "41 minutes"},
    "T28302H": {"timeRanges": ["10:29-20:27"],"mealLocation": "TAURANGA CBD","mealTime": "36 minutes"},
    "T28303H": {"timeRanges": ["05:41-14:57"],"mealLocation": "TAURANGA CBD","mealTime": "53 minutes"},
    "T28304H": {"timeRanges": ["11:29-21:27"],"mealLocation": "TAURANGA CBD","mealTime": "60 minutes"},
    "T28305H": {"timeRanges": ["05:59-15:59"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T28306H": {"timeRanges": ["11:45-21:10"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T28307H": {"timeRanges": ["06:14-15:46"],"mealLocation": "TAURANGA CBD","mealTime": "48 minutes"},
    "T28309H": {"timeRanges": ["06:29-16:26"],"mealLocation": "TAURANGA CBD","mealTime": "30 minutes"},
    "T28311H": {"timeRanges": ["06:39-16:36"],"mealLocation": "TAURANGA CBD","mealTime": "31 minutes"},
    "T28313H": {"timeRanges": ["07:09-17:02"],"mealLocation": "TAURANGA CBD","mealTime": "51 minutes"},
    "T28315H": {"timeRanges": ["08:23-18:02"],"mealLocation": "TAURANGA CBD","mealTime": "38 minutes"},
    
    
    "T26501T": {"timeRanges": ["06:01-10:39", "14:34-18:28"],"mealLocation": "无","mealTime": "无"}, 
    "T26502T": {"timeRanges": ["05:46-10:38", "13:38-18:41"],"mealLocation": "无","mealTime": "无"}, 
    "T26503T": {"timeRanges": ["06:16-09:26", "13:24-18:18"],"mealLocation": "无","mealTime": "无"}, 
    "T26504T": {"timeRanges": ["05:52-10:05", "13:35-18:41"],"mealLocation": "无","mealTime": "无"}, 
    "T26505T": {"timeRanges": ["06:00-11:09", "14:09-18:49"],"mealLocation": "无","mealTime": "无"}, 
    "T26506T": {"timeRanges": ["06:10-10:33", "14:24-19:06"],"mealLocation": "无","mealTime": "无"}, 
    "T26507T": {"timeRanges": ["06:16-11:36", "14:44-19:08"],"mealLocation": "无","mealTime": "无"}, 
    "T26508T": {"timeRanges": ["06:27-11:21", "14:44-18:57"],"mealLocation": "无","mealTime": "无"}, 
    "T26509T": {"timeRanges": ["06:27-10:07", "14:04-19:20"],"mealLocation": "无","mealTime": "无"}, 
    "T26510T": {"timeRanges": ["06:32-11:37", "14:38-19:31"],"mealLocation": "无","mealTime": "无"}, 
    "T26511T": {"timeRanges": ["06:35-11:25", "13:59-18:38"],"mealLocation": "无","mealTime": "无"}, 
    "T26512T": {"timeRanges": ["06:38-11:39", "14:40-19:36"],"mealLocation": "无","mealTime": "无"}, 
    "T26513T": {"timeRanges": ["06:38-11:05", "15:05-19:38"],"mealLocation": "无","mealTime": "无"}, 
    "T26514T": {"timeRanges": ["06:42-11:56", "14:59-19:37"],"mealLocation": "无","mealTime": "无"}, 
    "T26515T": {"timeRanges": ["06:44-11:53", "14:38-19:27"],"mealLocation": "无","mealTime": "无"}, 
    "T26516T": {"timeRanges": ["06:51-11:55", "14:38-19:51"],"mealLocation": "无","mealTime": "无"}, 
    "T26517T": {"timeRanges": ["06:57-11:24", "15:04-19:57"],"mealLocation": "无","mealTime": "无"}, 
    "T26518T": {"timeRanges": ["07:01-12:09", "15:09-20:01"],"mealLocation": "无","mealTime": "无"}, 
    "T26519T": {"timeRanges": ["07:07-11:49", "14:44-19:58"],"mealLocation": "无","mealTime": "无"}, 
    "T26520T": {"timeRanges": ["07:08-12:03", "15:04-20:08"],"mealLocation": "无","mealTime": "无"}, 
    "T26521T": {"timeRanges": ["07:11-12:24", "15:44-20:10"],"mealLocation": "无","mealTime": "无"}, 
    "T26522T": {"timeRanges": ["07:17-12:13", "15:06-20:07"],"mealLocation": "无","mealTime": "无"}, 
    "T26523T": {"timeRanges": ["07:20-12:33", "16:08-20:18"],"mealLocation": "无","mealTime": "无"}, 
    "T26524T": {"timeRanges": ["07:33-12:51", "16:09-20:24"],"mealLocation": "无","mealTime": "无"}, 
    "T26525T": {"timeRanges": ["09:09-13:53", "16:21-20:55"],"mealLocation": "无","mealTime": "无"},
    
    
    "T28501T": {"timeRanges": ["05:29-10:01", "13:41-18:02"],"mealLocation": "无","mealTime": "无"},
    "T28502T": {"timeRanges": ["05:59-10:39", "13:59-18:42"],"mealLocation": "无","mealTime": "无"},
    "T28503T": {"timeRanges": ["06:44-11:41", "14:50-19:40"],"mealLocation": "无","mealTime": "无"},
    "T28504T": {"timeRanges": ["06:59-12:01", "14:56-19:45"],"mealLocation": "无","mealTime": "无"},
    "T28505T": {"timeRanges": ["07:27-12:41", "16:07-20:27"],"mealLocation": "无","mealTime": "无"},
    "T28506T": {"timeRanges": ["07:28-12:11", "14:52-19:57"],"mealLocation": "无","mealTime": "无"},
    "T28507T": {"timeRanges": ["07:29-12:09", "14:51-20:10"],"mealLocation": "无","mealTime": "无"},
    "T28400T": {"timeRanges": ["07:25-08:53", "14:05-15:59"],"mealLocation": "无","mealTime": "无"},
    "T28401T": {"timeRanges": ["07:29-08:53", "14:05-15:53"],"mealLocation": "无","mealTime": "无"},
    "T28402T": {"timeRanges": ["07:32-08:43", "14:20-16:08"],"mealLocation": "无","mealTime": "无"},
    "T28403T": {"timeRanges": ["07:32-08:43", "14:20-16:08"],"mealLocation": "无","mealTime": "无"},
    "T28404T": {"timeRanges": ["07:32-08:43", "14:20-16:08"],"mealLocation": "无","mealTime": "无"},
    "T28405T": {"timeRanges": ["07:37-08:48", "14:05-15:53"],"mealLocation": "无","mealTime": "无"},
    
    
    "T26501H": {"timeRanges": ["05:40-10:39", "13:54-18:33"],"mealLocation": "无","mealTime": "无"},
    "T26502H": {"timeRanges": ["05:42-09:46", "13:09-18:06"],"mealLocation": "无","mealTime": "无"},
    "T26503H": {"timeRanges": ["05:47-10:24", "13:18-18:38"],"mealLocation": "无","mealTime": "无"},
    "T26504H": {"timeRanges": ["05:53-11:03", "13:39-18:28"],"mealLocation": "无","mealTime": "无"},
    "T26505H": {"timeRanges": ["06:01-11:05", "13:51-18:41"],"mealLocation": "无","mealTime": "无"},
    "T26506H": {"timeRanges": ["06:14-11:33", "14:40-19:14"],"mealLocation": "无","mealTime": "无"},
    "T26507H": {"timeRanges": ["06:16-11:09", "14:04-19:08"],"mealLocation": "无","mealTime": "无"},
    "T26508H": {"timeRanges": ["06:30-11:24", "14:34-19:26"],"mealLocation": "无","mealTime": "无"},
    "T26509H": {"timeRanges": ["06:32-11:51", "14:38-19:12"],"mealLocation": "无","mealTime": "无"},
    "T26510H": {"timeRanges": ["06:40-11:39", "15:09-19:38"],"mealLocation": "无","mealTime": "无"},
    "T26511H": {"timeRanges": ["06:44-11:54", "14:24-19:10"],"mealLocation": "无","mealTime": "无"},
    "T26512H": {"timeRanges": ["06:45-12:03", "15:19-19:38"],"mealLocation": "无","mealTime": "无"},
    "T26513H": {"timeRanges": ["06:56-12:16", "15:38-19:52"],"mealLocation": "无","mealTime": "无"},
    "T26514H": {"timeRanges": ["06:57-12:05", "14:59-19:50"],"mealLocation": "无","mealTime": "无"},
    "T26515H": {"timeRanges": ["06:59-12:10", "15:19-19:57"],"mealLocation": "无","mealTime": "无"},
    "T26516H": {"timeRanges": ["07:16-12:09", "15:04-20:10"],"mealLocation": "无","mealTime": "无"},
    "T26517H": {"timeRanges": ["07:33-12:36", "15:21-20:18"],"mealLocation": "无","mealTime": "无"},
    "T26518H": {"timeRanges": ["07:41-12:52", "15:59-20:40"],"mealLocation": "无","mealTime": "无"},
    "T26519H": {"timeRanges": ["08:01-12:22", "15:24-20:44"],"mealLocation": "无","mealTime": "无"},
    "T26520H": {"timeRanges": ["08:51-13:53", "16:19-20:54"],"mealLocation": "无","mealTime": "无"},
    "T26521H": {"timeRanges": ["08:59-14:13", "16:13-20:35"],"mealLocation": "无","mealTime": "无"},
    "T26522H": {"timeRanges": ["09:09-14:11", "15:59-20:57"],"mealLocation": "无","mealTime": "无"},
    
    
    "T28501H": {"timeRanges": ["05:41-10:38", "13:45-17:39"],"mealLocation": "无","mealTime": "无"},
    "T28502H": {"timeRanges": ["06:11-11:01", "14:11-18:59"],"mealLocation": "无","mealTime": "无"},
    "T28503H": {"timeRanges": ["06:41-12:01", "14:52-19:06"],"mealLocation": "无","mealTime": "无"},
    "T28504H": {"timeRanges": ["06:44-11:41", "14:56-19:40"],"mealLocation": "无","mealTime": "无"},
    "T28505H": {"timeRanges": ["06:48-11:08", "14:45-19:45"],"mealLocation": "无","mealTime": "无"},
    "T28506H": {"timeRanges": ["06:59-11:49", "14:58-19:57"],"mealLocation": "无","mealTime": "无"},
    "T28507H": {"timeRanges": ["07:29-12:09", "15:01-20:10"],"mealLocation": "无","mealTime": "无"},
    "T28508H": {"timeRanges": ["08:45-13:09", "15:59-20:57"],"mealLocation": "无","mealTime": "无"},
    
    
    "T27301T": {"timeRanges": ["06:24-08:47", "14:28-16:56"],"mealLocation": "无","mealTime": "无"},
    "T27303T": {"timeRanges": ["06:55-08:37", "14:28-16:45"],"mealLocation": "无","mealTime": "无"},
    "T27305T": {"timeRanges": ["06:59-08:46", "14:23-16:11"],"mealLocation": "无","mealTime": "无"},
    "T27307T": {"timeRanges": ["07:04-08:37", "14:28-16:51"],"mealLocation": "无","mealTime": "无"},
    "T27309T": {"timeRanges": ["07:04-08:37", "14:28-16:51"],"mealLocation": "无","mealTime": "无"},
    "T27311T": {"timeRanges": ["07:09-08:40", "14:29-16:26"],"mealLocation": "无","mealTime": "无"},
    "T27313T": {"timeRanges": ["07:10-08:37", "14:28-16:25"],"mealLocation": "无","mealTime": "无"},
    "T27315T": {"timeRanges": ["07:11-08:40", "14:29-16:19"],"mealLocation": "无","mealTime": "无"},
    "T27317T": {"timeRanges": ["07:11-08:40", "14:29-16:19"],"mealLocation": "无","mealTime": "无"},
    "T27319T": {"timeRanges": ["07:11-08:53", "14:42-16:38"],"mealLocation": "无","mealTime": "无"},
    "T27321T": {"timeRanges": ["07:14-08:42", "14:20-16:27"],"mealLocation": "无","mealTime": "无"},
    "T27323T": {"timeRanges": ["07:15-08:36", "14:34-16:10"],"mealLocation": "无","mealTime": "无"},
    "T27325T": {"timeRanges": ["07:17-09:12", "13:41-16:19"],"mealLocation": "无","mealTime": "无"},
    "T27327T": {"timeRanges": ["07:18-08:40", "14:29-16:29"],"mealLocation": "无","mealTime": "无"},
    "T27329T": {"timeRanges": ["07:20-08:38", "14:34-16:33"],"mealLocation": "无","mealTime": "无"},
    "T27331T": {"timeRanges": ["07:20-08:38", "14:34-16:33"],"mealLocation": "无","mealTime": "无"},
    "T27333T": {"timeRanges": ["07:20-08:47", "14:25-16:50"],"mealLocation": "无","mealTime": "无"},
    "T27335T": {"timeRanges": ["07:22-08:37", "14:28-16:15"],"mealLocation": "无","mealTime": "无"},
    "T27337T": {"timeRanges": ["07:23-09:01", "14:25-16:14"],"mealLocation": "无","mealTime": "无"},
    "T27339T": {"timeRanges": ["07:24-08:36", "14:34-16:14"],"mealLocation": "无","mealTime": "无"},
    "T27341T": {"timeRanges": ["07:25-08:45", "14:39-16:16"],"mealLocation": "无","mealTime": "无"},
    "T27343T": {"timeRanges": ["07:25-08:36", "14:33-16:33"],"mealLocation": "无","mealTime": "无"},
    "T27345T": {"timeRanges": ["07:28-08:33", "14:33-16:31"],"mealLocation": "无","mealTime": "无"},
    "T27347T": {"timeRanges": ["07:29-08:35", "14:35-16:31"],"mealLocation": "无","mealTime": "无"},
    "T27349T": {"timeRanges": ["07:30-08:58", "14:43-16:43"],"mealLocation": "无","mealTime": "无"},
    "T27351T": {"timeRanges": ["07:34-08:40", "13:41-16:16"],"mealLocation": "无","mealTime": "无"},
    "T27353T": {"timeRanges": ["07:39-08:46", "14:38-16:20"],"mealLocation": "无","mealTime": "无"},
    "T27355T": {"timeRanges": [, "13:44-17:44"],"mealLocation": "无","mealTime": "无"},
    "T27357T": {"timeRanges": ["07:39-08:55", "14:39-16:10"],"mealLocation": "无","mealTime": "无"},
    "T27359T": {"timeRanges": ["07:25-09:08", "15:07-16:33"],"mealLocation": "无","mealTime": "无"},
    "T27361T": {"timeRanges": ["07:31-09:20", "14:17-16:41"],"mealLocation": "无","mealTime": "无"},
    "T27362T": {"timeRanges": ["07:07-09:52", "13:57-16:07"],"mealLocation": "无","mealTime": "无"},
    "T27363T": {"timeRanges": [, "12:41-16:41"],"mealLocation": "无","mealTime": "无"},
    "T27364T": {"timeRanges": [, "12:10-16:10"],"mealLocation": "无","mealTime": "无"},
    "T27365T": {"timeRanges": [, "12:30-16:38"],"mealLocation": "无","mealTime": "无"},
    };
    