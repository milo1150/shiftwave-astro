import type { DefaultOptionType } from 'antd/es/select'
import { useUserProfile } from '@src/hooks/User'
import { transformBranchOptions } from '@src/dto/Branch'
import SwitchableDatepicker, {
  type HandleOnChangeDateValueType,
} from '@src/components/datepicker/SwitchableDatepicker'
import type { FetchReviewsQueryParams } from '@src/types/Review'
import { Row } from 'antd'
import Select from 'antd/es/select'
import { useState, useMemo, useEffect } from 'react'

type ReviewPageFilterProps = {
  dateChangeCallback: (e: HandleOnChangeDateValueType) => void
  branchChangeCallback: (e: string) => void
  setParams: React.Dispatch<React.SetStateAction<FetchReviewsQueryParams>>
}

const ReviewPageFilter: React.FC<ReviewPageFilterProps> = ({
  dateChangeCallback,
  branchChangeCallback,
  setParams,
}) => {
  const { userProfile } = useUserProfile()
  const [branchUuid, setBrachUuid] = useState<string>('')

  const branchOptions = useMemo<DefaultOptionType[]>(() => {
    return userProfile ? transformBranchOptions(userProfile?.branches) : []
  }, [userProfile])

  useEffect(() => {
    if (userProfile) {
      const firstBranchUuid = userProfile.branches[0].branch_uuid
      setBrachUuid(firstBranchUuid)
      setParams((prev) => {
        return { ...prev, branch: firstBranchUuid }
      })
    }
  }, [userProfile])

  return (
    <Row className="justify-center content-center">
      <Select
        style={{ width: '250px' }}
        options={branchOptions}
        className="mr-2"
        value={branchUuid}
        onChange={(_, optionValues) => {
          if (!optionValues) return
          const branchOpt = optionValues as DefaultOptionType
          setBrachUuid(branchOpt.value as string)
          branchChangeCallback(branchOpt.value as string)
        }}
      />
      <SwitchableDatepicker
        onChangeValueCallBack={(e) => dateChangeCallback(e)}
      />
    </Row>
  )
}

export default ReviewPageFilter
