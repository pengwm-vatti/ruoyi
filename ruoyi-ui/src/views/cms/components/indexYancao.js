export const l2Header = [
    '<span style="color:#37a2da;">时间</span>',
    '<span style="color:#37a2da;">商品名称</span>',
    '<span style="color:#37a2da;">价格</span>',
  '<span style="color:#37a2da;">数量</span>',
  '<span style="color:#37a2da;">商店名称</span>',
]
const now = new Date();
var formattedDate = now.getFullYear().toString() +
  (now.getMonth() + 1).toString().padStart(2, '0') +
  now.getDate().toString().padStart(2, '0');
export const l2Data = [
    [formattedDate, "农夫山泉天然水550ml", "3",2,"河源市源城区鸿利食品商行"],
    [formattedDate, "康师傅冰红茶1L", "5",5,"紫金县城宏发商店"],
    [formattedDate, "东鹏特饮500ml", "5",3,"河源市源城区鸿利食品商行"],
    [formattedDate, "百威啤酒听装500ml", "6",2,"河源市源城区金金食品商行"],
    [formattedDate, "黄鹤楼", "26",1,"河源市源城区金金食品商行"],
    [formattedDate, "农夫山泉天然水550ml", "3",4,"紫金县城宏发商店"],
    [formattedDate, "中华", "12",5,"紫金县义容镇鸿基副食批发部"],
    [formattedDate, "恰恰瓜子", "5",1,"紫金县义容镇鸿基副食批发部"],
    [formattedDate, "康师傅红烧牛肉面", "5",5,"河源市源城区鸿利食品商行"],
    [formattedDate, "农夫山泉天然水550ml", "3",2,"河源市源城区帝豪酒庄"],
    [formattedDate, "百威啤酒听装500ml", "6",6,"河源市源城区帝豪酒庄"],
]


/*{date: '20241015', goods_name: '农夫山泉天然水550ml', price: 3, num: 2, cust_name: '河源市源城区鸿利食品商行'}

{date: '20241015', goods_name: '康师傅冰红茶1L', price: 5, num: 5, cust_name: '河源市源城区鸿利食品商行'}

{date: '20241015', goods_name: '东鹏特饮500ml', price: 5, num: 3, cust_name: '河源市源城区鸿利食品商行'}

{date: '20241015', goods_name: '百威啤酒听装500ml', price: 6, num: 2, cust_name: '河源市源城区鸿利食品商行'}

{date: '20241015', goods_name: '黄鹤楼', price: 26, num: 1, cust_name: '河源市源城区金金食品商行'}

{date: '20241015', goods_name: '农夫山泉天然水550ml', price: 3, num: 4, cust_name: '河源市源城区金金食品商行'}
{date: '20241015', goods_name: '中华', price: 12, num: 5, cust_name: '河源市源城区帝豪酒庄'}
{date: '20241015', goods_name: '恰恰瓜子', price: 5, num: 1, cust_name: '紫金县义容镇鸿基副食批发部'}
{date: '20241015', goods_name: '康师傅红烧牛肉面', price: 5, num: 5, cust_name: '河源市源城区敬城食品商行'}
{date: '20241015', goods_name: '农夫山泉天然水550ml', price: 3, num: 2, cust_name: '紫金县城宏发商店'}

{date: '20241015', goods_name: '百威啤酒听装500ml', price: 6, num: 6, cust_name: '河源市源城区鸿利食品商行'}*/

export const convertedData = l2Data.map(item => ({
  date: item[0],
  goods_name: item[1],
  price: parseInt(item[2], 10), // 将价格转换为整数
  num: parseInt(item[3], 10), // 将数量转换为整数
  cust_name: item[4]
}));


export const l3Data1 = [
    { name: "烟草", value: 124 },
    { name: "其他", value: 4 },
    { name: "冰淇淋", value: 23 },
    { name: "方便面", value: 56 },
    { name: "饮料", value: 183 },
    // { name: "矿泉水", value: 104 },
    { name: "休闲食品", value: 164 },
    // { name: "牛奶乳饮", value: 45 },
    // { name: "酸奶", value: 61 },
    // { name: "啤酒", value: 123 },
    // { name: "白酒", value: 73 },
]
export const l3Data2 = [
    { name: "学生", value: 300 },
    { name: "教师", value: 605 },
]
export const l3Data3 = [
    { name: "0-5000", value: 700 },
    { name: "5000+", value: 305 },
]

export const m2XAxisData = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
]
export const m2SeriesData = [
    12200,
    9830,
    11200,
    7600,
    5600,
    8600,
    9885,
    5600,
    3585,
    8690,
    10585,
    11200,
]




export const r1Data = [
    '南京（雨花石）',
    '南京（煊赫门）',
    '黄金叶（天叶）',
    '钻石（荷花）',
    '七匹狼（纯境中支）',
    '利群（新）',
    '黄鹤楼（硬1916）',
    '白沙（和天下）',
    '中华（双中支）',
    '玉溪（软）',
]


export const r2XAxisData = [
  "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
]

export const r2SeriesData1 = [
    6000,
    7500,
    11000,
    4500,
    10500,
    3200,
]
export const r2SeriesData2 = [
    4500,
    7300,
    11100,
    4506,
    10505,
    3200,
]
export const r2SeriesData3 = [
    12642,
    10842,
    12648,
    10545,
    12097,
    10064,
]
export const r2SeriesData4 = [
    10542,
  10830,
  12640,
  10544,
    10597,
    13564,
]


export const r3Data = [
    {
        name: ' ● 黄鹤楼',
        value: 194,
    },
    {
        name: ' ● 中华',
        value: 163
    },
    {
        name: ' ● 康师傅冰红茶1L',
        value: 121
    },
    {
        name: '农夫山泉天然水500ml',
        value: 83
    },
    {
        name: '东鹏特饮500ml',
        value: 75
    },
    {
        name: '百威啤酒听装500ml',
        value: 68
    },
    {
        name: '康师傅红烧牛肉面',
        value: 53
    },
    {
        name: '维他柠檬茶250ml',
        value: 43
    },
    {
        name: '可口可乐500ml',
        value: 42
    },
    {
        name: '娃哈哈AD钙奶450ml',
        value: 41
    },
]
