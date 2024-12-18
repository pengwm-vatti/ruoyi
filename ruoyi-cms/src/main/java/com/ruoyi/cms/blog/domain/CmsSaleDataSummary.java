package com.ruoyi.cms.blog.domain;

import com.ruoyi.common.core.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

import java.math.BigDecimal;

public class CmsSaleDataSummary extends BaseEntity {


    private static final long serialVersionUID = 1L;



    /**
     * 销量
     */
    private int saleNum;


    /**
     * 商品名称
     */
    private String goodsName;

    public int getSaleNum() {
        return saleNum;
    }

    public void setSaleNum(int saleNum) {
        this.saleNum = saleNum;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

   /* @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("saleNum", getSaleNum())
                .append("goodsName", getGoodsName())
                .toString();

    }*/

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("sale", getSaleNum())
                .append("goodsName", getGoodsName())
                .toString();
    }
}

