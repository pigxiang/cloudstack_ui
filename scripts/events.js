// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
(function(cloudStack) {
  cloudStack.sections.events = {
    title: 'label.menu.events',
    id: 'events',
    sectionSelect: {
      preFilter: function(args) {
        if(isAdmin())
          return ["events", "alerts"];
        else
          return ["events"];
      },
      label: 'label.select-view'
    },
    sections: {
      events: {
        type: 'select',
        title: 'label.menu.events',
        listView: {
          id: 'events',
          label: 'label.menu.events',
          fields: {
            type: { label: 'label.type' },
            description: { label: 'label.description' },
            username: { label: 'label.initiated.by' },
            created: { label: 'label.date', converter: cloudStack.converters.toLocalDate }
          },
          dataProvider: function(args) {					  
						var array1 = [];  
						if(args.filterBy != null) {          
							if(args.filterBy.search != null && args.filterBy.search.by != null && args.filterBy.search.value != null) {
								switch(args.filterBy.search.by) {
								case "name":
									if(args.filterBy.search.value.length > 0)
										array1.push("&keyword=" + args.filterBy.search.value);
									break;
								}
							}
						}
						
            $.ajax({
              url: createURL("listEvents&listAll=true&page=" + args.page + "&pagesize=" + pageSize + array1.join("")),
              dataType: "json",
              async: true,
              success: function(json) {
                var items = json.listeventsresponse.event;
                args.response.success({data:items});
              }
            });
          },
					detailView: {
            name: 'label.details',
            tabs: {
              details: {
                title: 'label.details',
                fields: [
                  {
                    type: { label: 'label.type' },
                    description: { label: 'label.description' },
                    created: { label: 'label.date', converter: cloudStack.converters.toLocalDate }
                  }
                ],
                dataProvider: function(args) {								  
									$.ajax({
										url: createURL("listEvents&id=" + args.context.events[0].id),
										dataType: "json",
										async: true,
										success: function(json) {
											var item = json.listeventsresponse.event[0];
											args.response.success({data: item});
										}
									});									
								}
              }
            }
          }
        }
      },
      alerts: {
        type: 'select',
        title: 'label.menu.alerts',
        listView: {
          id: 'alerts',
          label: 'label.menu.alerts',
          fields: {
            description: { label: 'label.description' },
            sent: { label: 'label.date', converter: cloudStack.converters.toLocalDate }
          },
          dataProvider: function(args) {
					  var array1 = [];  
						if(args.filterBy != null) {          
							if(args.filterBy.search != null && args.filterBy.search.by != null && args.filterBy.search.value != null) {
								switch(args.filterBy.search.by) {
								case "name":
									if(args.filterBy.search.value.length > 0)
										array1.push("&keyword=" + args.filterBy.search.value);
									break;
								}
							}
						}
            $.ajax({
              url: createURL("listAlerts&listAll=true&page=" + args.page + "&pagesize=" + pageSize + array1.join("")),
              dataType: "json",
              async: true,
              success: function(json) {
                var items = json.listalertsresponse.alert;
                args.response.success({data:items});
              }
            });
          },
          detailView: {
            name: 'Alert details',
            tabs: {
              details: {
                title: 'label.details',
                fields: [
                  {
                    id: { label: 'ID' },
                    description: { label: 'label.description' },
                    sent: { label: 'label.date', converter: cloudStack.converters.toLocalDate }
                  }
                ],
                dataProvider: function(args) {								  
									$.ajax({
										url: createURL("listAlerts&id=" + args.context.alerts[0].id),
										dataType: "json",
										async: true,
										success: function(json) {
											var item = json.listalertsresponse.alert[0];
											args.response.success({data: item});
										}
									});															 
								}
              }
            }
          }
        }
      }
    }
  };
})(cloudStack);