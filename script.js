// script.js 文件1
console.log("script.js 文件正在运行..."); // 页面加载时在控制台输出信息，确认 script.js 文件已加载
import { shiftOptionsGroups, shiftDetailsDictionary } from "./data.js";

const version = "v0.3.8";

// iOS 和 Safari 检测
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// 检查是否已显示过提示（使用 localStorage 避免重复弹出）
const hasShownPrompt = localStorage.getItem('iosSafariPromptShown');

if (isIOS && !isSafari && !hasShownPrompt) {
  // 弹出提示框
  alert(
    'Notice for iOS Users:\n\nFor the best experience, please open this app in Safari and add it to your Home Screen.\n\nSteps:\n1. Open in Safari\n2. Tap the Share button (↑)\n3. Select "Add to Home Screen"'
  );
  // 标记已显示提示
  localStorage.setItem('iosSafariPromptShown', 'true');
}




document.addEventListener("DOMContentLoaded", function () {
  //  当 HTML 文档完全加载完成后执行的代码

  console.log("DOMContentLoaded 事件触发，DOM 已加载完成");

  document.querySelector(
    "#about-section .about-content"
  ).innerHTML += `<p>Current version: ${version}</p>`;

  // 1. 获取 DOM 元素 (getElementById)
  const schoolHolidaySwitch = document.getElementById("school-holiday-switch"); // 学校假期开关
  const greertonDepotButton = document.getElementById("greerton-depot"); // Greerton DEPOT 按钮
  const papamoaDepotButton = document.getElementById("papamoa-depot"); // Papamoa DEPOT 按钮
  const malemeDepotButton = document.getElementById("maleme-depot"); // Maleme DEPOT 按钮
  const backToDepotSelectionButton = document.getElementById(
    "back-to-depot-selection"
  ); // "返回" 按钮

  const depotSelectionUI = document.getElementById("depot-selection-ui"); // DEPOT 选择界面容器
  const weekDateSelector = document.getElementById("week-date-selector"); // 日期选择器 section 元素
  const weekStartDateInput = document.getElementById("week-start-date"); // 日期 input 元素

  const scheduleWeekView = document.getElementById("schedule-week-view"); // **新增: 获取 日期列表视图 section 元素**
  const backToDateSelectorButton = document.getElementById(
    "back-to-date-selector-button"
  ); // **新增: 获取 "返回" 按钮 (日期列表视图 页面)**
  const addToCalendarButton = document.getElementById("add-to-calendar-button"); // **新增: 获取 "添加到日历" 按钮**

  const depotSelectionUi = document.getElementById("depot-selection-ui");
  const aboutSection = document.getElementById("about-section");
  const aboutButton = document.getElementById("about-button");
  const backToDepotButton = document.getElementById("back-to-depot-from-about");
  const backToDepotFromAboutButton = document.getElementById(
    "back-to-depot-from-about"
  );

  // About 按钮
  aboutButton.addEventListener("click", () => {
    console.log("About button clicked");
    depotSelectionUi.style.display = "none";
    aboutSection.style.display = "block";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  // 返回 DEPOT 选择（从 About）
  backToDepotFromAboutButton.addEventListener("click", () => {
    console.log("Back from About clicked");
    depotSelectionUi.style.display = "block";
    aboutSection.style.display = "none";
    weekDateSelector.style.display = "none";
    scheduleWeekView.style.display = "none";
  });

  // 2. 学校假期开关交互 (占位功能，后续完善)
  schoolHolidaySwitch.addEventListener("change", function (event) {
    isSchoolHolidayEnabled = event.target.checked; //  更新 School Holiday 开关状态变量
    const isSchoolHoliday = event.target.checked; // 获取开关状态 (true=选中, false=未选中)
    console.log("School Holiday Switch 状态改变:", isSchoolHoliday);
    //  后续完善：  根据开关状态，更新排班逻辑或界面显示

    //  **新增:  当 School Holiday 开关状态改变时， 重新填充日期列表视图的下拉菜单选项**
    if (scheduleWeekView.style.display === "block") {
      //  如果日期列表视图当前是显示的
      updateShiftOptionsInTableView(); //  调用函数重新更新下拉菜单选项 (函数定义见下方)
    }
  });

  // **9. “添加到日历” 按钮  点击事件监听器**
  addToCalendarButton.addEventListener("click", function () {
    console.log("“添加到日历” 按钮被点击了"); // 调试信息 -  按钮点击时， 在控制台输出信息

    // **1. 获取排班表格的 <tbody> 元素**
    const scheduleTableBody = scheduleWeekView.querySelector("tbody"); // 获取 <tbody> 元素
    if (!scheduleTableBody) {
      // **安全检查： 确保 <tbody> 元素存在**
      console.error("找不到排班表格的 <tbody> 元素！");
      return; // 如果找不到 <tbody> 元素， 提前结束函数执行， 避免后续代码出错
    }

    // **2. 获取 <tbody> 元素中的所有数据行 (<tr> 元素)**
    const scheduleRows = scheduleTableBody.querySelectorAll("tr"); // 获取 <tbody> 中所有的 <tr> 元素
    if (!scheduleRows || scheduleRows.length === 0) {
      // **安全检查： 确保 找到至少一行数据行**
      console.warn("排班表格 <tbody> 中没有找到任何数据行 (<tr>)！"); // 使用 console.warn 输出警告信息
      return; // 如果找不到数据行， 提前结束函数执行
    }

    console.log("找到排班表格数据行 (<tr>) 数量:", scheduleRows.length); // 调试信息： 输出找到的数据行数量

    // **5.1. 创建数组存储排班数据**
    const shiftEvents = []; // 初始化一个空数组，用于存储排班事件数据

    // **3. 循环遍历 数据行 <tr>， 提取每一行的日期和班次信息**
    scheduleRows.forEach((row) => {
      // 使用 forEach 循环遍历每一行 <tr> 元素
      console.log("--- 开始处理一行数据 (<tr>) ---"); // 调试信息 -  标记开始处理新的一行数据

      // **3.2. 在每一行 <tr> 中， 获取 日期 和 班次的 <td> 元素**
      const dateCell = row.querySelectorAll("td")[0]; // 获取当前行 <tr> 中索引为 1 的 <td> 元素 (日期单元格)
      const shiftCell = row.querySelectorAll("td")[1]; // 获取当前行 <tr> 中索引为 2 的 <td> 元素 (班次单元格)

      if (!dateCell || !shiftCell) {
        // **安全检查： 确保 日期单元格 和 班次单元格 都存在**
        console.warn(
          "  当前行 (<tr>) 中， 找不到日期单元格 (<td>) 或 班次单元格 (<td>)！ 跳过处理当前行。"
        ); // 使用 console.warn 输出警告信息
        return; // 如果找不到 日期单元格 或 班次单元格， 提前结束当前行的处理， 继续处理下一行
      }

      console.log("  找到日期单元格 (<td>):", dateCell); // 调试信息 -  输出日期单元格 <td> 元素
      console.log("  找到班次单元格 (<td>):", shiftCell); // 调试信息 -  输出班次单元格 <td> 元素

      // **3.3. 从日期单元格 <td> 中提取日期值**
      const dateText = dateCell.textContent.trim(); // 获取日期单元格 <td> 的文本内容，并去除首尾空格
      console.log("    提取到的日期文本:", dateText); // 调试信息 - 输出提取到的日期文本

      // **3.4. 从班次单元格 <td> 中提取班次选择值**
      const shiftSelector = shiftCell.querySelector("select.shift-selector"); // 在班次单元格 <td> 内查找 <select class="shift-selector"> 元素
      if (!shiftSelector) {
        // **安全检查： 确保 在班次单元格中找到 <select> 元素**
        console.warn(
          "    在班次单元格 (<td>) 中， 找不到 <select class='shift-selector'> 元素！ 跳过处理当前行。"
        ); // 使用 console.warn 输出警告信息
        return; // 如果找不到 <select> 元素， 提前结束当前行的处理， 继续处理下一行
      }

      const selectedShiftValue = shiftSelector.value; // 获取 <select> 元素的当前选中的 value 值 (班次代码)
      console.log("    提取到的班次选择值:", selectedShiftValue); // 调试信息 - 输出提取到的班次选择值

      // **5.2. 创建对象存储每一天的排班数据，并添加到 shiftEvents 数组**
      const eventData = {
        // 创建一个对象，存储当前行的排班数据
        date: dateText, // 存储日期文本
        shiftCode: selectedShiftValue, // 存储班次选择值
      };
      shiftEvents.push(eventData); // 将当前行的排班数据对象 添加到 shiftEvents 数组中
      console.log("    当前行排班数据对象:", eventData); // 调试信息 - 输出当前行排班数据对象
      console.log("    shiftEvents 数组当前内容:", shiftEvents); // 调试信息 - 输出 shiftEvents 数组的当前内容

      //  后续步骤：  将在下方继续添加代码，  从日期和班次单元格中  提取数据
    });

    // **4. 生成 iCalendar (.ics) 文件内容**
    let icsContent = "";
    icsContent += "BEGIN:VCALENDAR\r\n";
    icsContent += "VERSION:2.0\r\n";
    icsContent += "PRODID:-//Your Organization//Your Application//EN\r\n";
    icsContent += "CALSCALE:GREGORIAN\r\n";
    icsContent += "METHOD:PUBLISH\r\n";

    shiftEvents.forEach((event) => {
      console.log("  --- 开始为排班数据对象生成 VEVENT 事件 ---", event);
      const shiftCode = event.shiftCode;
      const dateText = event.date;
      const shiftDetails = shiftDetailsDictionary[shiftCode];

      if (
        shiftDetails &&
        shiftDetails.timeRanges &&
        shiftDetails.timeRanges.length > 0
      ) {
        // 根据 timeRanges 的数量来判断是否需要添加 AM/PM 后缀
        shiftDetails.timeRanges.forEach((timeRange, index) => {
          icsContent += "BEGIN:VEVENT\r\n";

          // 生成 UID
          const uid = generateUuid();
          icsContent += `UID:${uid}\r\n`;
          console.log("    生成的 UID:", uid);

          // 生成 DTSTAMP
          const now = new Date();
          const dtstamp = formatDateTimeToUTCString(now);
          icsContent += `DTSTAMP:${dtstamp}\r\n`;
          console.log("    生成的 DTSTAMP:", dtstamp);

          // 处理时间段
          const [startTimeStr, endTimeStr] = timeRange.split("-");
          const startDateTime = createUTCDateFromDateTextAndTime(
            dateText,
            startTimeStr
          );
          const endDateTime = createUTCDateFromDateTextAndTime(
            dateText,
            endTimeStr
          );

          if (startDateTime && endDateTime) {
            const dtstart = formatDateTimeToUTCString(startDateTime);
            const dtend = formatDateTimeToUTCString(endDateTime);
            console.log(
              `创建 DTSTART: ${dtstart} (原始: ${startDateTime.toISOString()})`
            );
            console.log(
              `创建 DTEND: ${dtend} (原始: ${endDateTime.toISOString()})`
            );

            icsContent += `DTSTART:${dtstart}\r\n`;
            icsContent += `DTEND:${dtend}\r\n`;
          } else {
            console.warn(
              `    警告: 时间段 "${timeRange}" 的开始时间或结束时间 Date 对象创建失败! 跳过当前时间段.`
            );
            icsContent += "END:VEVENT\r\n";
            return; // 跳过当前时间段
          }

          // 根据是否存在多个时间段来添加 SUMMARY 后缀
          let summarySuffix = "";
          if (shiftDetails.timeRanges.length === 2) {
            summarySuffix = index === 0 ? " AM" : " PM";
          }
          icsContent += `SUMMARY:${shiftCode}${summarySuffix}\r\n`;
          console.log("    生成的 SUMMARY:", shiftCode + summarySuffix);

          // 生成 DESCRIPTION
          let description = "";
          if (shiftDetails) {
            description += `Meal Location: ${
              shiftDetails.mealLocation || "None"
            }， Meal Time: ${shiftDetails.mealTime || "None"}\n`;
          } else {
            description += `Shift Number "${shiftCode}" 详情未找到.\n`;
          }
          icsContent += `DESCRIPTION:${description}\r\n`;
          console.log("    生成的 DESCRIPTION:", description);

          icsContent += "END:VEVENT\r\n";
          console.log("  --- 单个 VEVENT 事件生成完成 ---");
        });
      } else {
        console.warn(
          `    警告: 班次代码 "${shiftCode}" 在 shiftDetailsDictionary 中找不到详情 或 没有定义时间段! 跳过该排班数据.`
        );
      }
    });

    icsContent += "END:VCALENDAR\r\n";

    console.log("生成的 .ics 文件内容:\n", icsContent); // 调试信息 -  输出生成的 .ics 文件内容到控制台

    // **6. 触发 .ics 文件下载**

    // **6.1. 创建 Blob 对象 - 将 .ics 文件内容转换为 Blob**
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    }); // 创建 Blob 对象，MIME type 设置为 text/calendar

    // **6.2. 创建下载链接 (URL)**
    const downloadUrl = URL.createObjectURL(blob); // 使用 URL.createObjectURL() 方法创建 Blob 对象的 URL

    // **6.3. 获取预先存在的 <a> 元素 (download link)**
    const downloadLink = document.getElementById("hiddenDownloadLink"); // **获取预先存在的 <a> 元素**
    downloadLink.href = downloadUrl; // 设置 <a> 元素的 href 属性为 Blob URL
    // downloadLink.download = '排班日历.ics';     // **<a download> 属性已经在 HTML 中设置， 这里不需要重复设置**  (可以省略这行)

    // downloadLink.style.display = 'none';     // **隐藏样式已经在 HTML 中设置， 这里不需要重复设置** (可以省略这行)

    // **6.4.  不需要将 <a> 元素添加到 body 中 (因为元素已经在 HTML 中)**
    // document.body.appendChild(downloadLink); // 将 <a> 元素添加到 document.body 中  - **移除这行**

    // **6.5. 模拟点击 <a> 元素，触发文件下载**
    downloadLink.click(); // 模拟点击 <a> 元素，触发文件下载

    // **6.6. (可选)  下载完成后， 释放 Blob URL**
    URL.revokeObjectURL(downloadUrl); // 释放 Blob URL， 释放内存
    // document.body.removeChild(downloadLink); // 将 <a> 元素从 document.body 中移除 -  移除这行， 因为 <a> 元素是预先存在的，不需要移除

    console.log("已触发 .ics 文件下载 (使用预先存在的 <a> 元素)"); // 修改调试信息

    //  “添加到日历” 按钮 点击事件处理函数  代码结束

    //  后续步骤：  在这里编写  生成 .ics 文件  并  下载的代码
  });

  // 3. DEPOT 按钮点击事件 - 添加点击事件监听器 (显示日期选择器，隐藏DEPOT选择界面)
  greertonDepotButton.addEventListener("click", function () {
    console.log("Greerton DEPOT 按钮被点击了");
    currentDepot = "depot1"; // **更新当前 DEPOT 选择为 "depot1" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Greerton)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  papamoaDepotButton.addEventListener("click", function () {
    console.log("Papamoa DEPOT 按钮被点击了");
    currentDepot = "depot2"; // **更新当前 DEPOT 选择为 "depot2" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Papamoa)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  malemeDepotButton.addEventListener("click", function () {
    console.log("Maleme DEPOT 按钮被点击了");
    currentDepot = "depot3"; // **更新当前 DEPOT 选择为 "depot3" (或者你定义的键名)**
    //  后续完善：  记录选择的 DEPOT (例如 Maleme)

    depotSelectionUI.style.display = "none"; // 隐藏 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 确保日期列表视图 初始状态是隐藏的**
  });

  // 4.  "返回" 按钮点击事件 - 添加点击事件监听器 (显示DEPOT选择界面，隐藏日期选择器和日期列表视图)
  backToDepotSelectionButton.addEventListener("click", function () {
    console.log("返回 按钮被点击了");

    depotSelectionUI.style.display = "block"; // 显示 DEPOT 选择 UI 容器
    weekDateSelector.style.display = "none"; // 隐藏日期选择器 section
    scheduleWeekView.style.display = "none"; // **新增: 隐藏日期列表视图 section**
  });

  // 5.  日期选择器  日期选择完成事件 -  监听  weekStartDateInput 的 'change' 事件
  weekStartDateInput.addEventListener("change", function (event) {
    const selectedDate = event.target.value; // 获取用户选择的日期值 (YYYY-MM-DD 格式字符串)
    console.log("用户在日期选择器中选择了日期:", selectedDate);

    // **新增:  日期选择完成后，隐藏日期选择器，显示日期列表视图**
    weekDateSelector.style.display = "none"; // 隐藏日期选择器 section
    scheduleWeekView.style.display = "block"; // 显示日期列表视图 section

    // **新增:  动态填充日期列表视图表格的 "日期" 列**
    const startDate = new Date(selectedDate); // 将YYYY-MM-DD 字符串转换为 Date 对象
    const dayOfWeek = startDate.getDay(); // 获取选择日期是星期几 (0-周日, 6-周六)
    const sundayDate = new Date(startDate); // 创建一个新的 Date 对象，避免修改原日期
    sundayDate.setDate(startDate.getDate() - dayOfWeek); // 将日期设置为这周的周日

    const dateCells = scheduleWeekView.querySelectorAll(
      "tbody tr td:nth-child(2)"
    ); // 获取表格中 "日期" 列的所有 <td> 单元格 (注意: 第2列是日期列)

    for (let i = 0; i < dateCells.length; i++) {
      // 循环遍历 7 个日期单元格 (周日到周六)
      const currentDate = new Date(sundayDate); // 创建一个新的 Date 对象，避免修改周日日期
      currentDate.setDate(sundayDate.getDate() + i); //  在周日的基础上，依次增加 i 天，得到周一，周二...周六的日期

      const formattedDate =
        String(currentDate.getDate()).padStart(2, "0") +
        "/" +
        String(currentDate.getMonth() + 1).padStart(2, "0"); // 格式化日期为 DD/MM 形式 (例如 01/01)

      dateCells[i].textContent = formattedDate; // 将格式化后的日期字符串填充到对应的 <td> 单元格中
    }

    // **新增:  动态填充日期列表视图表格的 "Shift" 列下拉菜单选项**
    updateShiftOptionsInTableView(); //  调用函数更新下拉菜单选项 (函数定义见下方)

    //  后续完善：  根据选择的日期，加载或生成排班数据，并更新日期列表视图
  });

  // 6.  "返回" 按钮点击事件 - 添加点击事件监听器 (显示日期选择器，隐藏日期列表视图) -  日期列表视图 页面 "返回" 按钮
  backToDateSelectorButton.addEventListener("click", function () {
    // **新增:  日期列表视图 页面 "返回" 按钮  点击事件监听器**
    console.log("返回 按钮 (日期列表视图 页面) 被点击了");

    weekDateSelector.style.display = "block"; // 显示日期选择器 section
    scheduleWeekView.style.display = "none"; // 隐藏日期列表视图 section
  });

  //  7.  日期格式化函数 (YYYY-MM-DD 格式字符串  转换为  中文日期格式  例如 "2024年1月1日") -  **无需修改，保留**
  function formatDateToChinese(dateString) {
    const date = new Date(dateString); // 使用 Date 构造函数将YYYY-MM-DD 字符串转换为 Date 对象
    const year = date.getFullYear(); // 获取年份
    const month = date.getMonth() + 1; // 获取月份 (getMonth() 返回 0-11，需要 +1)
    const day = date.getDate(); // 获取日期

    return year + "年" + month + "月" + day + "日"; // 拼接成中文日期格式字符串
  }

  // **8.  新增函数:  动态更新日期列表视图表格的 "Shift" 列下拉菜单选项 -  函数定义**
  function updateShiftOptionsInTableView() {
    console.log("updateShiftOptionsInTableView() 函数被调用"); //  调试信息

    const shiftSelectors = scheduleWeekView.querySelectorAll(
      "tbody tr td select.shift-selector"
    ); // 获取表格中 "Shift" 列的所有 <select> 元素
    const weekdayHolidaySwitches = scheduleWeekView.querySelectorAll(
      '.weekday-holiday-switch input[type="checkbox"]'
    ); // **新增: 获取所有工作日 (周一-周五) 的公共假日开关 (如果添加了 weekday-holiday-switch 类名)**
    // **10.  新增: 为每个工作日公共假日开关添加事件监听器 (立即更新表格备选项)**
    weekdayHolidaySwitches.forEach((holidaySwitch) => {
      // 循环遍历每个工作日公共假日开关
      holidaySwitch.addEventListener("change", function () {
        // 为每个开关添加 'change' 事件监听器
        console.log("工作日公共假日开关状态改变， 立即更新表格备选项"); // 调试信息
        updateShiftOptionsInTableView(); // 立即调用函数更新表格备选项
      });
    });
    console.log("weekdayHolidaySwitches NodeList:", weekdayHolidaySwitches); // **调试信息： 输出 weekdayHolidaySwitches NodeList**

    shiftSelectors.forEach((selectElement, index) => {
      // 循环遍历每个 <select> 元素及其索引 (index)
      //  index 0-6 分别对应 表格中的 周日-周六 行

      const dayIndex = index; //  index 0-6  对应周日-周六
      let dayOfWeek = dayIndex === 0 || dayIndex === 6 ? "weekend" : "weekday"; // 判断是周末还是工作日 (周日 0, 周六 6)

      console.log(
        `---  处理星期${
          ["日", "一", "二", "三", "四", "五", "六"][dayIndex]
        } (dayIndex: ${dayIndex}, dayOfWeek: ${dayOfWeek}) ---`
      ); // **调试信息： 输出当前处理的星期几**

      // **新增:  检查工作日 (周一-周五) 的公共假日开关状态，  如果开启，  则  强制将 dayOfWeek 设置为 "weekend"，  使用周末备选项**
      if (dayOfWeek === "weekday" && dayIndex >= 1 && dayIndex <= 5) {
        //  只对工作日 (周一到周五) 进行判断
        const currentWeekdayHolidaySwitch =
          weekdayHolidaySwitches[dayIndex - 1]; //  获取当前工作日对应的公共假日开关 (weekdayHolidaySwitches 索引 0-4 对应 周一-周五)

        console.log(
          "  工作日 (周一到周五), 尝试获取 weekdayHolidaySwitch:",
          currentWeekdayHolidaySwitch
        ); // **调试信息： 输出 currentWeekdayHolidaySwitch 元素**

        if (
          currentWeekdayHolidaySwitch &&
          currentWeekdayHolidaySwitch.checked
        ) {
          //  如果开关存在 且  被选中 (checked)
          console.log(
            "  星期",
            ["日", "一", "二", "三", "四", "五", "六"][dayIndex],
            "的 公共假日开关  被选中 (checked: true)"
          ); // **调试信息： 输出开关选中状态**
          dayOfWeek = "weekend"; //  强制将 dayOfWeek 设置为 "weekend"， 使用周末备选项
          console.log("  强制将 dayOfWeek 修改为: weekend"); // **调试信息： 输出 dayOfWeek 修改后的值**
        } else {
          console.log(
            "  星期",
            ["日", "一", "二", "三", "四", "五", "六"][dayIndex],
            "的 公共假日开关  未选中 或 不存在 (checked:",
            currentWeekdayHolidaySwitch
              ? currentWeekdayHolidaySwitch.checked
              : "开关不存在",
            ")"
          ); // **调试信息： 输出开关未选中或不存在状态**
        }
      } else {
        console.log("  周末 (周六或周日)，  跳过 工作日公共假日开关 检查"); // **调试信息：  周末跳过检查**

        console.log(
          `星期${
            ["日", "一", "二", "三", "四", "五", "六"][dayIndex]
          } 的公共假日开关已开启， 备选项切换为周末组`
        ); //  调试信息
      }

      let currentOptionsGroupKey = currentDepot; //  默认为当前 DEPOT 的正常备选项组 (例如 "depot1", "depot2", "depot3")
      if (isSchoolHolidayEnabled) {
        currentOptionsGroupKey += "-schoolHoliday"; //  如果 School Holiday 开关开启，则使用 School Holiday 备选项组 (例如 "depot1-schoolHoliday")
      }

      const optionsGroup =
        shiftOptionsGroups[currentOptionsGroupKey][dayOfWeek]; //  根据条件，获取对应的备选项组 (例如 shiftOptionsGroups["depot1"]["weekend"]  或者  shiftOptionsGroups["depot1-schoolHoliday"]["weekday"])

      //  清空下拉菜单  之前已有的选项 (除了 "请选择班次" 默认选项)
      while (selectElement.options.length > 1) {
        //  保留第一个 option (index 0) 作为 "请选择班次" 提示
        selectElement.remove(1); //  从索引 1 开始移除选项 (索引 0 是 "请选择班次")
      }

      //  将新的备选项组  添加到下拉菜单
      optionsGroup.forEach((optionText) => {
        // 循环遍历备选项组中的每个选项文本
        const optionElement = document.createElement("option"); //  动态创建 <option> 元素
        optionElement.value = optionText; //  设置 <option> 的 value 属性 (例如 "早班", "午班"...) -  **注意:  这里 value 和 textContent 设置为相同的 选项文本**
        optionElement.textContent = optionText; //  设置 <option> 的文本内容 (用户看到的选项文字， 例如 "早班", "午班"...)
        selectElement.appendChild(optionElement); //  将新创建的 <option> 元素  添加到 <select> 下拉菜单中
      });
    }); //  shiftSelectors.forEach() 循环 结束
  } //  updateShiftOptionsInTableView() 函数定义 结束
}); //  DOMContentLoaded 事件监听器 结束

//  3.  存储当前 DEPOT 选择 和 School Holiday 开关状态
let currentDepot = null; //  存储当前选择的 DEPOT (例如 "depot1", "depot2", "depot3"， 默认为 null)
let isSchoolHolidayEnabled = false; //  存储 School Holiday 开关状态 (true=开启, false=关闭， 默认为 false)

// 注册 Service Worker
if ("serviceWorker" in navigator) {
  console.log("script.js: Registering Service Worker");
  navigator.serviceWorker
    .register("./service-worker.js")
    .then((registration) => {
      console.log("script.js: Service Worker registered:", registration);

      // 检查是否有等待中的新 Service Worker
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            // 新 Service Worker 已安装，且当前有控制器（旧 Service Worker）
            console.log("New Service Worker is waiting to activate");
            // 提示用户刷新或自动激活
            if (
              confirm(
                'A new version is available. Refresh to update?'
              )
            ) {
              newWorker.postMessage({ action: "skipWaiting" });
            }
          }
        });
      });
    })
    .catch((err) =>
      console.error("script.js: Service Worker registration failed:", err)
    );

  // 监听控制器变化，刷新页面以使用新缓存
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller changed, reloading to use new Service Worker");
    window.location.reload();
  });
}

// 接收 Service Worker 的消息
navigator.serviceWorker.addEventListener("message", (event) => {
  if (event.data && event.data.action === "skipWaiting") {
    console.log("Skipping waiting via message");
  }
});
