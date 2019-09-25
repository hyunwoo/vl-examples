const csvFilePath = './raw/1.case.csv';
const csv = require('csvtojson');
const _ = require('lodash');
const fs = require('fs');


async function starter() {
  const jsonArray = await csv().fromFile(csvFilePath);
  console.log(jsonArray[0]);
  const ret = _.map(jsonArray, v => {
    return {
      id: v.ID * 1,
      state: v['발생경찰서'][0] + v['발생경찰서'][1],
      loc: v['발생경찰서'].replace('경찰서', ''),
      date: new Date(v['발생일시']),
      locDetail: v['발생위치-전체주소'],
      crime7: v['검거죄종(7대)'] ? v['검거죄종(7대)'] : '-',
      crime: v['검거죄명'] ? v['검거죄명'] : '-',
      longitude: v['경도'] * 1,
      latitude: v['위도'] * 1,
    };
  })

  const crimes = _(ret).map(r => r.crime).union().value();
  const crimes7 = _(ret).map(r => r.crime7).union().value();
  console.log(crimes);
  console.log(crimes7);
  console.log(ret[0]);
  fs.writeFileSync('./generated/case.json', JSON.stringify(ret));

}

starter();