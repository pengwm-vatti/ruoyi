package com.ruoyi.cms.blog.service.impl;


import com.ruoyi.cms.blog.domain.CmsSaleData;
import com.ruoyi.cms.blog.domain.CmsSaleDataSummary;
import com.ruoyi.cms.blog.mapper.CmsSaleDataMapper;
import com.ruoyi.cms.blog.service.ICmsSaleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CmsSaleDataServiceImpl implements ICmsSaleDataService {

    @Autowired
    private CmsSaleDataMapper cmsSaleDataMapper;

    /**
     * 查询销量top10商品
     */
    @Override
    public List<CmsSaleDataSummary> selectSaleDataTOP(CmsSaleDataSummary cmsSaleDataSummary) {
        List<CmsSaleDataSummary> cmsSaleDataList = cmsSaleDataMapper.selectSaleDataTOP(cmsSaleDataSummary);
        return cmsSaleDataList;
    }

}
