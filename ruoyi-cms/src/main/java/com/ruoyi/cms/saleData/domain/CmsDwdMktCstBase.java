package com.ruoyi.cms.saleData.domain;

import com.ruoyi.common.core.domain.BaseEntity;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class CmsDwdMktCstBase extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * ID
     */
    private Long id;

    /**
     * 企业名称
     */
    private String custName;

    /**
     * 经营地址
     */
    private String address;

    /**
     * 行政区域编码
     */
    private String areaCode;

    /**
     * 行政区域简称
     */
    private String areaName;

    /**
     * 行政区划（街道）
     */
    private String streetCode;

    /**
     * 行政区域（社区）
     */
    private String villageCode;

    /**
     * GIS经度
     */
    private String gisLong;

    /**
     * GIS纬度
     */
    private String gisLat;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAreaCode() {
        return areaCode;
    }

    public void setAreaCode(String areaCode) {
        this.areaCode = areaCode;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public String getStreetCode() {
        return streetCode;
    }

    public void setStreetCode(String streetCode) {
        this.streetCode = streetCode;
    }

    public String getVillageCode() {
        return villageCode;
    }

    public void setVillageCode(String villageCode) {
        this.villageCode = villageCode;
    }

    public String getGisLong() {
        return gisLong;
    }

    public void setGisLong(String gisLong) {
        this.gisLong = gisLong;
    }

    public String getGisLat() {
        return gisLat;
    }

    public void setGisLat(String gisLat) {
        this.gisLat = gisLat;
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this, ToStringStyle.MULTI_LINE_STYLE)
                .append("id", getId())
                .append("custName", getCustName())
                .append("address", getAddress())
                .append("areaCode", getAreaCode())
                .append("areaName", getAreaName())
                .append("streetCode", getStreetCode())
                .append("villageCode", getVillageCode())
                .append("gisLong", getGisLong())
                .append("gisLat", getGisLat())
                .toString();
    }
}
