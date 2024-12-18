package com.ruoyi.cms.blog.mapper;

import com.ruoyi.cms.blog.domain.CmsSaleData;
import com.ruoyi.cms.blog.domain.CmsSaleDataSummary;

import java.util.List;

public interface CmsSaleDataMapper {
    /**
     * 查询商品top10
     */
    public List<CmsSaleDataSummary> selectSaleDataTOP(CmsSaleDataSummary cmsSaleDataSummary);
}
