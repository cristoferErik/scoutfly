package com.scoutfly.com.scoutfly.util.paginator;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class PageRender {
    private Integer currentPage;
    private Integer totalPages;
    private static final int MAXPAGES = 5;
    private Integer size;
    public PageRender(Integer currentPage, Integer totalPages,Integer size) {
        this.currentPage = currentPage;
        this.totalPages = totalPages==0?0:totalPages-1;
        this.size = size;
    }

    public List<Integer> getPageNumbers() {
        int startPage = ((currentPage / MAXPAGES) * MAXPAGES);
        int endPage;
        if (startPage + MAXPAGES > totalPages) {
            endPage = totalPages;
        } else {
            endPage = (startPage + MAXPAGES) - 1;
        }
        List<Integer> pageNumbers = new ArrayList<>();
        for (int i = startPage; i <= endPage; i++) {
            pageNumbers.add(i);
        }
        //System.out.println("current page--->"+currentPage);
        //System.out.println("total_page--->"+totalPages);
        return pageNumbers;
    }
    public Map<String,Object> generatePageLink(String basePath,List<Integer> listNumbers){
        List<Map<String,Object>> response=new ArrayList<>();

        for (Integer pageNumber : listNumbers) {
            Map<String,Object> pageLink = new HashMap<>();
            pageLink.put("page", pageNumber+1);
            pageLink.put("link", this.generatePageLink(basePath,pageNumber, size));
            if(Objects.equals(pageNumber, currentPage)){
                pageLink.put("actual",true);
            }
            response.add(pageLink);
        }

        Map<String,Object> page = new HashMap<>();
        
        if(currentPage!=0){
            page.put("first",this.generatePageLink(basePath,0,this.size));
            page.put("prev",this.generatePageLink(basePath,this.currentPage-1,this.size));
        }
        if(!Objects.equals(currentPage, totalPages)){
            page.put("next",this.generatePageLink(basePath,this.currentPage+1,this.size));
            page.put("last",this.generatePageLink(basePath,this.totalPages,this.size));
        }
        page.put("numbers",response);
        return page;
    }
    public String generatePageLink(String basePath,Integer pageNumber, Integer size) {
        return ServletUriComponentsBuilder.fromPath(basePath)
                .replaceQueryParam("page", pageNumber)
                .replaceQueryParam("size", size)
                .toUriString();
    }
}
