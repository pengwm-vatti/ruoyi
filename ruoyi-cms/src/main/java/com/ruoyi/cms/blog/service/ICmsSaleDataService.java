package com.ruoyi.cms.blog.service;

import com.ruoyi.cms.blog.domain.CmsSaleData;
import com.ruoyi.cms.blog.domain.CmsSaleDataSummary;

import java.util.List;

public interface ICmsSaleDataService {

    /**
     * 查询销量top10商品
     */
    public List<CmsSaleDataSummary> selectSaleDataTOP(CmsSaleDataSummary cmsSaleDataSummary);
}
