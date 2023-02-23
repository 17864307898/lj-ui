import { t, TYPE_MAP } from './handle'

export const handleColumns = (type = 1) => {
  const publicColumn = [
    {
      label: t('index'),
      type: 'index',
    },
    {
      label: t('fileName'),
      prop: 'language',
    },
  ]

  if (type === 1) {
    publicColumn.push({
      label: t('fileSize'),
      prop: TYPE_MAP[1],
    })
  } else {
    publicColumn.push({
      label: t('codeCount'),
      prop: TYPE_MAP[2],
    })
  }

  return publicColumn
}