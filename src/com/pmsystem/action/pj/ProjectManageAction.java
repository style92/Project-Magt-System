package com.pmsystem.action.pj;

import java.util.HashMap;
import java.util.Map;

import com.opensymphony.xwork2.ActionSupport;
import com.pmsystem.model.pj.Project;

public class ProjectManageAction extends ActionSupport {
	private Project project;
	private Map<String, Object> jsonMap;
	private boolean success;

	public ProjectManageAction(){
		jsonMap = new HashMap<String, Object>();
	}
	
	public String addProject() {
		System.out.println("name : " + project.getName());
		System.out.println("desc : " + project.getDesc());
		jsonMap.put("success", true);
		return SUCCESS;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Map<String, Object> getJsonMap() {
		return jsonMap;
	}

	public void setJsonMap(Map<String, Object> jsonMap) {
		this.jsonMap = jsonMap;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}
	
}
