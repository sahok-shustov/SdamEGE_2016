/**
 * Configuration
 * StateProvide (Routes)
 * httpProvider (Headers)
 */

ege.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider', 'ionGalleryConfigProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider, ionGalleryConfigProvider) {
        // $httpProvider.defaults.headers.common['X-Authentication'] = '6WE8f0Nx3nDtn1UWmpV5kipBFXMDT2xx7VYMg8NL';
        $httpProvider.defaults.headers.get = { 'X-Authentication': '6WE8f0Nx3nDtn1UWmpV5kipBFXMDT2xx7VYMg8NL' };
        // $ionicConfigProvider.navBar.alignTitle('center');
        ionGalleryConfigProvider.setGalleryConfig({
            action_label: 'Close',
            toggle: false,
            row_size: 3,
            fixed_row_size: true
        });

        $stateProvider

            .state('subjects', {
                cache: true,
                url: '/subjects',
                templateUrl: 'templates/subjects.html',
                controller: 'SubjectsCtrl'
            })
            .state('topics', {
                cache: true,
                url: '/topics/:subject_ID',
                templateUrl: 'templates/topics.html',
                controller: 'TopicsCtrl'
            })
            .state('additional_topics', {
                cache: true,
                url: '/additional_topics/:additional_subject_ID',
                templateUrl: 'templates/additionalTopics.html',
                controller: 'AdditionalTopicsCtrl'
            })
            .state('materials', {
                cache: true,
                url: '/materials/:topic_ID',
                templateUrl: 'templates/materials.html',
                controller: 'MaterialsCtrl'
            })
            .state('material_date', {
                cache: true,
                url: '/material_date/:materilsDate_ID',
                templateUrl: 'templates/material_date.html',
                controller: 'DescriptionDateCtrl'
            })
            .state('material_html', {
                cache: true,
                url: '/material_html/:material_html_ID',
                templateUrl: 'templates/material_html.html',
                controller: 'DescriptionHtmlCtrl'
            })
            .state('material_image', {
                cache: true,
                url: '/material_image',
                templateUrl: 'templates/material_image.html',
                controller: 'DescriptionCtrl'
            })
            .state('material_text', {
                cache: true,
                url: '/material_text',
                templateUrl: 'templates/material_text.html',
                controller: 'DescriptionCtrl'
            })
            .state('material_text_image', {
                cache: true,
                url: '/material_text_image',
                templateUrl: 'templates/material_text_image.html',
                // controller: 'DescriptionTextHtmlCtrl'
            })
            // if none of the above states are matched, use this as the fallback

        $urlRouterProvider.otherwise('/subjects');
    }
]);
