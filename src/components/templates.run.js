export const TemplateRun = ['$templateCache', function($templateCache) {$templateCache.put('directory-search.component.html','<!-- tabs title start -->\n<ul class="tabs" data-tabs="" data-deep-link="true" data-deep-link-smudge="true" data-deep-link-smudge-delay="600" id="{{ ::$ctrl.ID.DIRECTORY_TABS }}" role="tablist">\n  <li class="tabs-title is-active" role="presentation" id="searchTab" ng-click="$ctrl.removeSearchResult()">\n    <a href="#tab1-1" role="tab" aria-controls="tab1-1" aria-selected="true" id="tab1-1-label">Directory search</a>\n  </li>\n  <li class="tabs-title" role="presentation" id="contactsTab" ng-click="$ctrl.removeSearchResult()">\n    <a href="#tab1-2" role="tab" aria-controls="tab1-2" aria-selected="false" id="tab1-2-label">Common contacts</a>\n  </li>\n  <li class="tabs-title" role="presentation" id="updateTab" ng-click="$ctrl.removeSearchResult()">\n    <a href="#tab1-3" role="tab" aria-controls="tab1-3" aria-selected="false" id="tab1-3-label">Update your entry</a>\n  </li>\n</ul>\n<!-- tabs title end -->\n<!-- tabs content start -->\n<div class="tabs-content" data-tabs-content="{{ ::$ctrl.ID.DIRECTORY_TABS }}" id="{{ ::$ctrl.ID.DIRECTORY_TABS_CONTENT }}">\n  <!-- TAB 1 STARTS  -->\n  <div class="tabs-panel is-active" id="tab1-1" role="tabpanel" aria-hidden="false" aria-labelledby="tab1-1-label">\n    <div class="row">\n      <div class="xxsmall-12 columns">\n        <!-- TAB TITLE  -->\n        <h2>Search</h2>\n        <br/>\n        <p>Enter a first name, a last name, or a department to find a Faculty or Staff member. Partial names can also be used.</p>\n      </div>\n    </div>\n    <!-- INPUT FIELDS FOR FIRST NAME, LAST NAME, AND DEPARTMENT -->\n    <form>\n      <div class="row">\n        <div class="xxsmall-12 medium-3 columns">\n          <label>First name:\n          <input type="text" ng-model="$ctrl.$state.searchName.firstname" ng-change="$ctrl.modifyResultResetDropdown()" ng-model-options="{ debounce: 200 }" />\n          <span class="form-error" style="display:block;" ng-show="$ctrl.$state.userError">\n          {{ $ctrl.$state.userError }}\n          </span>\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-3 columns">\n          <label>Last name:\n          <input type="text" ng-model="$ctrl.$state.searchName.lastname" ng-change="$ctrl.modifyResultResetDropdown()" ng-model-options="{ debounce: 200 }" />\n          <span class="form-error" style="display:block;" ng-show="$ctrl.$state.userError">\n          {{ $ctrl.$state.userError }}\n          </span>\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-3 columns">\n          <label for="">\n            Select department:\n            <!-- SEARCH DEPARTMENT BY INPUT FIELD -->\n            <select ng-show="$ctrl.$state.departments" ng-model="$ctrl.$state.searchName.department" ng-options="department for department in $ctrl.$state.departments" ng-change="$ctrl.modifyResultClearInput()">\n              <option value="">Select department</option>\n            </select>\n            <select ng-hide="$ctrl.$state.departments" disabled>\n              <option value="">Loading departments&hellip;</option>\n            </select>\n            <span class="form-error" style="display:block;" ng-show="$ctrl.$state.departmentError">\n            {{ $ctrl.$state.departmentError }}\n            </span>\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-3 columns" ng-if="$ctrl.$state.searchName.department || $ctrl.$state.searchName.lastname || $ctrl.$state.searchName.firstname">\n          <button class="button results-button" ng-click="$ctrl.smoothScrollTo($ctrl.ID.SEARCH_RESULTS)">\n          <span ng-show="$ctrl.$state.users && $ctrl.$state.users.length">Results below &nbsp;<span class="icon_arrow_down bounce"></span></span>\n          <span ng-hide="$ctrl.$state.users.length">Loading results&hellip;</span>\n          </button>\n        </div>\n      </div>\n    </form>\n    <p class="lead update-directory-msg"><strong>Notice an incorrect entry?</strong> <a href="#tab1-3" title="Submit an entry update request" target="_self" ng-click="$ctrl.gotoFormAndPopulate($event, {})">Let us know</a> the correct information!</p>\n  </div>\n  <!-- TAB 1 END  -->\n  <!-- TAB 2 STARTS -->\n  <div class="tabs-panel" id="tab1-2" role="tabpanel" aria-hidden="true" aria-labelledby="tab1-2-label">\n    <div ng-repeat="group in $ctrl.$state.contacts">\n      <h3>{{ ::group.category }}</h3>\n      <div class="row">\n        <span ng-repeat="contact in group.items" class="xxsmall-6 large-6 medium-6 columns contact-card{{ ::(contact.class ? \' contact-faculty \' + contact.class : \'\') }}">\n          <p class="contact-name"><strong>{{ ::contact.name }}</strong></p>\n          <p class="contact-phone"><a href="tel:{{ ::contact.phone | telLink }}" title="Place call to {{ ::contact.phone }}">{{ ::contact.phone }}</a></p>\n        </span>\n      </div>\n    </div>\n  </div>\n  <!-- TAB 2 END  -->\n  <!-- TAB 3 STARTS  -->\n  <div class="tabs-panel " id="tab1-3" role="tabpanel" aria-hidden="true" aria-labelledby="tab1-3-label">\n    <!-- TAB TITLE  -->\n    <h2>Update Information</h2>\n    <br/>\n    <p>If you are a Faculty or Staff member you can have your directory information updated by filling out the form below.</p>\n    <p>Alternatively, you may contact <a href="mailto:directory@uoit.ca" title="Contact directory@uoit.ca">directory@uoit.ca</a> directly if you have further questions or concerns.</p>\n    <!-- SHOW ERROR/SUCCESS MESSAGES -->\n    <div ng-show="$ctrl.$state.formStatus.success || $ctrl.$state.formStatus.error" class="callout" ng-class="{ success: $ctrl.$state.formStatus.success, alert: $ctrl.$state.formStatus.error }" data-closable>\n      {{ $ctrl.$state.formStatus.success || $ctrl.$state.formStatus.error }}\n      <button class="close-button" aria-label="Dismiss alert" type="button" data-close>\n      <span aria-hidden="true">&times;</span>\n      </button>\n    </div>\n    <!-- FORM -->\n    <form ng-submit="$ctrl.updateForm.$valid && $ctrl.processForm()" name="$ctrl.updateForm">\n\n      <div class="row">\n        <div class="xxsmall-12 medium-12 columns text-right">\n\t\t\t\t  <label>\n\t\t\t\t\t  Send me a copy of the update request\n\t\t\t\t\t  <input type="checkbox" name="sendCopy" ng-model="$ctrl.$state.formData.sendCopy" />\n\t\t\t\t\t</label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Banner ID:<span class="red"> *</span>\n          <input type="text" name="bannerId" ng-model="$ctrl.$state.formData.bannerId" ng-minlength="9" ng-minlength="9" ng-pattern="\'[1Ss]{1}00[0-9]{6}\'" required />\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="xxsmall-12 medium-6 columns">\n          <label>First name:<span class="red"> *</span>\n          <input type="text" name="firstname" ng-model="$ctrl.$state.formData.firstname" required />\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Last name:<span class="red"> *</span>\n          <input type="text" name="lastname" ng-model="$ctrl.$state.formData.lastname" required />\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Department:<span class="red"> *</span>\n          <input type="text" name="department" ng-model="$ctrl.$state.formData.department" required />\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Title:<span class="red"> *</span>\n          <input type="text" name="position" ng-model="$ctrl.$state.formData.position" required />\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Building:<span class="red"> *</span>\n          <input type="text" name="building" ng-model="$ctrl.$state.formData.building" required />\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Office:<span class="red"> *</span>\n          <input type="text" name="office" ng-model="$ctrl.$state.formData.office" required />\n          </label>\n        </div>\n      </div>\n      <div class="row">\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Extension:<span class="red"> *</span>\n          <input type="text" name="extension" ng-model="$ctrl.$state.formData.extension" required ng-pattern="\'[0-9]+\'" />\n          </label>\n        </div>\n        <div class="xxsmall-12 medium-6 columns">\n          <label>Email:<span class="red"> *</span>\n          <input type="email" name="email" ng-model="$ctrl.$state.formData.email" required />\n          </label>\n        </div>\n      </div>\n      <fieldset class="large-6 columns">\n        <button class="button" type="submit" value="Submit" role="button" ng-disabled="$ctrl.updateForm.$invalid">Submit</button>\n      </fieldset>\n    </form>\n  </div>\n</div>\n<!-- DISPLAY ANGULAR SEARCH RESULT IN CALLOUT/SERPERATE TAB  -->\n<div class="callout" id="{{ ::$ctrl.ID.SEARCH_RESULTS }}" ng-class="{ loading: $ctrl.$state.loadingResults }" ng-if="$ctrl.$state.searchName.department || $ctrl.$state.searchName.lastname || $ctrl.$state.searchName.firstname">\n  <div class="search-list">\n    <div class="row">\n      <div class="xxsmall-12 small-6 columns">\n        <h3>Directory search results</h3>\n      </div>\n      <div class="xxsmall-12 small-6 columns" ng-show="$ctrl.$state.users.length">\n        <div class="tiny button-group align-right">\n          <div class="flex-container align-middle">\n            <label id="sort_by">Sort by: &nbsp;</label>\n          </div>\n          <button id="sort_firstname" class="button" ng-click="$ctrl.sortBy(\'firstname\')" ng-class="{hollow: $ctrl.$state.order !== \'firstname\'}" aria-labelledby="sort_by sort_firstname">First name</button>\n          <button id="sort_lastname" class="button" ng-click="$ctrl.sortBy(\'lastname\')" ng-class="{hollow: $ctrl.$state.order !== \'lastname\'}" aria-labelledby="sort_by sort_lastname">Last name</button>\n          <button id="sort_department" class="button" ng-click="$ctrl.sortBy(\'department\')" ng-class="{hollow: $ctrl.$state.order !== \'department\'}" aria-labelledby="sort_by sort_department">Department</button>\n        </div>\n      </div>\n      <div class="xxsmall-12 columns">\n        <p class="lead" ng-hide="($ctrl.$state.currentPage + 1) > $ctrl.numberOfPages()">To reach a Faculty or Staff member dial the main switchboard at 905.721.8668 and ask for the extension listed.</p>\n        <p class="lead" ng-show="($ctrl.$state.currentPage + 1)> $ctrl.numberOfPages()">Sorry, no directory search results to display.</p>\n      </div>\n    </div>\n  </div>\n  <!-- FILTER / REPEAT / DISPLAY BASED ON WHAT THE USER TYPES -->\n  <ul class="accordion" data-accordion data-allow-all-closed="true">\n    <!-- SEARCH DEPARTMENT BY INPUT FIELD -->\n    <li class="accordion-item" ng-class="{ \'accordion-item-open\': user.show }" data-accordion-item ng-repeat="user in $ctrl.$state.users | filter: $ctrl.$state.searchName | orderBy: $ctrl.$state.order | startFrom: $ctrl.$state.currentPage * $ctrl.$state.pageSize | limitTo: $ctrl.$state.pageSize">\n      <!-- SEARCH DEPARTMENT BY DROPDOWN -->\n      <a class="accordion-title" ng-click="user.show = !user.show; user.show && $ctrl.getUser(user)">\n        {{ ::user.firstname }} {{ ::user.lastname }}\n        <ul class="accordion-title-desc">\n          <li>\n            <strong>Department:</strong>\n            {{ ::user.department }}\n          </li>\n          <li>\n            <strong>Title:</strong>\n            {{ ::user.position }}\n          </li>\n        </ul>\n      </a>\n      <div class="a-content">\n        <ul class="search-list-info">\n          <li>\n            <strong>Building:</strong>\n            {{ ::user.building }}\n          </li>\n          <li>\n            <strong>Office:</strong>\n            {{ ::user.office && user.office.length ? user.office : \'n/a\' }}\n          </li>\n          <li>\n            <strong>Extension:</strong>\n            <a href="tel:{{ ::(\'905.721.8668 ext.\' + user.extension) | telLink }}" title="Place call to {{ ::user.firstname }} {{ ::user.lastname }}">{{::user.extension}}</a>\n          </li>\n          <li>\n            <strong>Email:</strong>\n            <a href="mailto:{{ ::user.email }}">{{ ::user.email | lowercase }}</a>\n          </li>\n        </ul>\n        <p class="text-right"><small><a href="#tab1-3" title="Submit an entry update request" target="_self" ng-click="$ctrl.gotoFormAndPopulate($event, user)">Notice something wrong?</a></small></p>\n        <div ng-if="user.expert">\n          <hr/>\n          <small ng-hide="user.expert.username">\n          <em class="subheader">Checking for Expert profile...</em>\n          </small>\n          <div class="expert-profile media-object" ng-show="user.expert.username">\n            <div class="media-object-section">\n              <div class="thumbnail">\n                <img ng-src="{{ user.expert.url }}" alt="Photo of {{ user.expert.firstname }} {{ user.expert.lastname }}">\n              </div>\n            </div>\n            <div class="media-object-section main-section">\n              <div class="row align-middle">\n                <div class="column">\n                  <h4>{{ user.expert.firstname }} {{ user.expert.lastname }} <small class="subheader">on UOIT Expert Centre</small></h4>\n                  <p class="expert-profile-topics"><a ng-repeat="topic in user.expert.topics" ng-href="https://uoit.ca/expertcentre?q={{ topic.name }}" class="label tertiary">{{ topic.name }}</a></p>\n                  <p>{{ user.expert.tagline }}</p>\n                </div>\n                <div class="column shrink">\n                  <a ng-href="https://uoit.ca/expertcentre/expert/{{ user.expert.username }}" class="button hollow">View full profile</a>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </li>\n  </ul>\n  <!-- PAGINATION - FUNCTIONAL -->\n  <div class="text-center pagination-container">\n    <ul class="pagination" role="navigation" aria-label="Pagination" ng-hide="($ctrl.$state.currentPage + 1) > $ctrl.numberOfPages()">\n      <li class="pagination-previous">\n        <a role="button" ng-class="{ disabled: ($ctrl.$state.currentPage === 0) }" ng-click="!($ctrl.$state.currentPage === 0) && $ctrl.changePageAndScroll(-1)">\n        <span class="icon_arrow_left"></span>\n        Previous <span class="show-for-sr">page</span>\n        </a>\n      </li>\n      <li ng-repeat="page in $ctrl.getPageNumbers()">\n        <a aria-label="Page {{ page }}" ng-click="$ctrl.gotoPageAndScroll(page)" ng-class="{ current: ($ctrl.$state.currentPage + 1) === page }">\n        <span ng-show="($ctrl.$state.currentPage + 1) === page" class="show-for-sr">currently viewing</span>\n        <span class="show-for-sr">page</span>{{ page }}\n        </a>\n      </li>\n      <li class="pagination-next">\n        <a role="button" ng-class="{ disabled: (($ctrl.$state.currentPage + 1) >= $ctrl.numberOfPages()) }" ng-click="!(($ctrl.$state.currentPage + 1) >= $ctrl.numberOfPages()) && $ctrl.changePageAndScroll(1)">\n        Next <span class="show-for-sr">page</span>\n        <span class="icon_arrow_right"></span>\n        </a>\n      </li>\n    </ul>\n    <span class="label tertiary">\n    {{ $ctrl.$state.currentPage + 1 }} out of {{ $ctrl.numberOfPages() }}\n    </span>\n  </div>\n</div>\n');}];