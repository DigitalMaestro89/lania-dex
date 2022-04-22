export const wordlist = [
  'hmwtWJgHLT',
  'xkaWDaBfTSNXoVp',
  'VUpd',
  'n',
  'NVVQiHYQcl',
  'pKDM',
  'QglgubOmNfwGe',
  'qqreRUSdBAY',
  'VZsIEuckvku',
  'hLIj',
  'A',
  'CXLMbheXclrfgH',
  'CSZ',
  'a',
  'XANFziklNGGC',
  'cjmZkFkgouS',
  'mJsh',
  'HgiVpWLxhxjRRuj',
  'GWB',
  'wNbI',
  'dhKktbWxfOQ',
  'pijOKXxrah',
  'kpnVgBBgeZNUUhU',
  'YDTRHHwPgGm',
  'kHZ',
  'ketIdcfPj',
  'nGiTKkyoXbcFwPa',
  'Be',
  'mlypXOdqvh',
  'Qwaszuc',
  'jqcCj',
  'hykvKCbk',
  'ZvOPvvrTgbZP',
  'WGnFfrDDpLcmr',
  'fkhHZbhszx',
  'gQIoOErbwajl',
  'xRURTRJ',
  'TFbmPoXlefR',
  'oXEUQKtrrNY',
  'ebsUyqdTYp',
  'kIhDAnsFLwIRRK',
  'jAoyWglApromb',
  'OOmH',
  'dyFuwNzHgyzPUI',
  'h',
  'mbwfwahXXRhjSE',
  'jMnbMOJiuKvK',
  'JTk',
  'VgHuZYSc',
  'xA',
  'oBNwNAcdxAOcd',
  'ajx',
  'QocLfSxPjDLA',
  'DwHgKEkmYobDM',
  'q',
  'QJE',
  'rLO',
  'mb',
  'UPrIbKvAHb',
  'rzfGaQj',
  'PVAYzrdJcX',
  'P',
  'ykrxiNqx',
  'uPHgidCeRsqHQJN',
  'PAtLDHELoSDX',
  'KYOtVTmQVj',
  'wWfjFtzuba',
  'IwEdah',
  'brbxh',
  'FXwnPiwKZXbU',
  'ngUqgbHyXSs',
  'GNYkKbKG',
  'gFxhFpYN',
  'ozNIAPyhO',
  'ip',
  'oHSbUCraZhk',
  'pdFNTpm',
  'eCQMuxlKpBVMBl',
  'PzVgzuQymilTv',
  'oOYWheLecy',
  'QywgboJqJzzH',
  'elMku',
  'QLQfiXkU',
  'rwMPqhKSlvZIIiI',
  'JjAGf',
  'PpefuCjhjvUztBW',
  'gDQNurdSsmMczF',
  'gHPm',
  't',
  'IPqzICVJsMN',
  'eMBjKUWwCSLYjDN',
  'rwibwgBLRwfD',
  'okvR',
  'THHnUToouoU',
  'dQiNDErK',
  'TNnMsNcVzGGddUm',
  'RbbNIfjxeVWQ',
  'qDd',
  'rxjyCbWDrm',
  'AxLnkWGUUAMxMY'
]

export function findSeeds() {
  const seeds: { i: number; word: string }[] = []
  const randoms: number[] = []

  for (let i = 0; i < 20; i++) randoms.push(Math.ceil(Math.random() * 100))

  for (let index = 0; index < wordlist.length; index++) {
    const word = wordlist[index]
    if (seeds.length < 4 && randoms.includes(index)) {
      seeds.push({ i: index, word })
    }
  }

  return seeds
}
