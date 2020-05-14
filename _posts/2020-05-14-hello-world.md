```java
@Override
@Description(value = "운송장자동등록", order = 1)
public List<Map<String, Object>> saveInvAtmtRgst( List<Map<String, Object>> paramList  ) {

    Map<String, Object> retMap = new HashMap<String, Object>() ;
    List<Map<String, Object>> retList = new ArrayList<Map<String, Object>>();

    String rtnVal = essValChck(paramList);
    if(!"OK".equals(rtnVal)){
        retMap.put("errCode", -01) ;
        retMap.put("errMsg", rtnVal) ;
        retMap.put("retList", paramList) ;
        retList.add(retMap) ;
        return retList;
    }
        
```

