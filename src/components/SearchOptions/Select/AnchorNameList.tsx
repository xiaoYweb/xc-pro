import React, { FC } from 'react';
import SeflSelect from '@/components/SearchOptions/Select';
import { anchorList } from '@/utils/enum';

interface AnchorNameListProps {
  Wrap: any;
  wrapProps: object; // wrapProps = { label: '商品编码', name: '', ...}
  pathname?: string;
  mode?: any;
  selectValue?: string;
  selectLabel?: string;
  onSelect?: any;
  allowClear?: boolean
  withoutAll?: boolean
  showSearch?: boolean
  [propname: string]: any;
}

// const anchorList = [
//   { value: 'mm_131278284_92800131_108899050292', py: 'xyz|xinyouzhi', label: '辛有志' },
//   { value: 'mm_131278284_92800131_17344350432', py: 'crx|churuixue', label: '初瑞雪' }, // 10-30 茂业需求 雪大改为初瑞雪
//   { value: 'mm_14688961_1058200291_109716900353', py: 'crx|churuixue', label: '初瑞雪2' }, // 10-30 杨洋需求 新增角色
//   { value: 'mm_492720052_1053800209_109717050224', py: 'dd|dandan', label: '蛋蛋' },
//   // { value: 'mm_492720052_1052750301_109714350220', py: '|', label: '韩佩泉' }, // 10-30 杨洋需求 移除角色
//   // { value: 'mm_492720052_1053500229_109711450269', py: '|lu', label: '鹿' }, // 11-10 茂业需求 移除角色
//   { value: 'mm_492720052_1029750256_109684800024', py: 'mmm|maomeimei', label: '猫妹妹' },
//   { value: 'mm_492720052_1011950275_109653300416', py: 'zmc|zhaomengche', label: '赵梦澈' },
//   { value: 'mm_131278284_92800131_109424250077', py: 'ddnn|dengdengnainai', label: '等等奶奶' },
//   // { value: 'mm_355940184_392250068_105980750374', py: '|', label: '韩佩泉2' }, // 10-30 杨洋需求 移除角色
//   { value: 'mm_492720052_1324850437_110054400321', py: 'cxs|chenxiaoshuo', label: '陈小硕' },
//   // { value: 'mm_492720052_1325400371_110050650366', py: 'xq|xiaoq', label: '小琴' }, // 11-10 茂业需求 移除角色
//   { value: 'mm_492720052_1333500017_110050000412', py: 'sdpl|shidapiaoliang', label: '时大漂亮' },
//   { value: 'mm_492720052_1327400329_110049500444', py: 'arx|anruoxi', label: '安若溪' },
//   // { value: 'mm_492720052_1329800244_110049050485', py: 'xbp|xiaobaipang', label: '小白胖' }, // 11-10 茂业需求 移除角色
//   { value: 'mm_492720052_1776050006_110481150017', py: 'ds|dashao', label: '达少' },
//   { value: 'mm_492720052_1822100201_110534850227', py: 'xj|xujie', label: '徐婕' },
//   { value: 'mm_492720052_1787550344_110490250382', py: 'bjlbxkx|bujiaolabidexiaokexin', label: '不叫蜡笔的小可新' },
//   { value: 'mm_492720052_1921050430_110676950445', py: 'aj|anjiu', label: '安九' },
//   { value: 'mm_492720052_1928500039_110680250356', py: 'ww|wuwu', label: '五五' },
//   { value: 'mm_492720052_1923050415_110681550319', py: 'hd|huaduo', label: '花朵' },
//   { value: 'mm_492720052_2012050480_110804850381', py: 'dd|dandan', label: '丹丹' },
//   { value: 'mm_492720052_2041050332_110857100049', py: 'yxy|yuanxiaoye', label: '原小野' }, // 11-10 茂业需求 新增角色
//   { value: 'mm_492720052_2098400156_110915400077', py: 'xar|xiaoanran', label: '小安然' }, // 11-10 茂业需求 新增角色
//   { value: 'mm_492720052_2098500159_110921100080', py: 'ddtdxx|dandantudixixi', label: '丹丹徒弟西西' }, // 11-10 茂业需求 新增角色
//   { value: 'mm_492720052_2092900204_110920600097', py: 'ddtdxx|dandantudixinxin', label: '丹丹徒弟心心' }, // 11-10 茂业需求 新增角色
//   { value: 'mm_492720052_2114800242_110951950319', py: 'plxsyt|piaoliangxueshengyiting', label: '漂亮学生伊婷' }, // 11-10 茂业需求 新增角色
//   { value: 'mm_492720052_2115150212_110952900253', py: 'plxscdx|piaoliangxueshengcuidaxian', label: '漂亮学生崔大仙' }, // 11-10 茂业需求 新增角色
// ]
const textMap: any = {}
anchorList.forEach(({ py, label }) => {
  textMap[label] = py;
})
// 应用列表 / 来源系统  列表
const AnchorNameList: FC<AnchorNameListProps> = props => {
  const {
    dispatch, Wrap, wrapProps, pathname, selectLabel, selectValue, onSelect, withoutAll = true, showSearch=true, ...rest
  } = props;



  // 选择列表项
  const handleOnSelect = (val: string) => {
    if (!onSelect) return
    const res = anchorList.find((item: any) => item.value === val)
    onSelect(res)
  }

  const handleFilter = (input: string, option: any) => {
    const label = option.children;
    const val = input ? input.replace(/[^A-z\u4e00-\u9fa5]/g, '').toLowerCase() : input;
    const py = textMap[label]; // 
    if (py && val && /[a-z]/g.test(val)) {
      return py.indexOf(val) >= 0
    }
    return label.indexOf(val) >= 0
  }

  return <SeflSelect
    Wrap={Wrap}
    wrapProps={wrapProps}
    list={anchorList}
    onSelect={handleOnSelect}
    filterOption={handleFilter}
    showSearch={showSearch}
    withoutAll={withoutAll}
    {...rest}
  />
}

export default AnchorNameList;