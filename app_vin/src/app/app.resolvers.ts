import { inject } from '@angular/core';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { QuickChatService } from 'app/layout/common/quick-chat/quick-chat.service';
import { ShortcutsService } from 'app/layout/common/shortcuts/shortcuts.service';
import { forkJoin } from 'rxjs';
/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();
export const initialDataResolver = () =>
{
    const messagesService = [
        {
            id         : '832276cc-c5e9-4fcc-8e23-d38e2e267bc9',
            image      : 'assets/images/avatars/male-01.jpg',
            title      : 'Gary Peters',
            description: 'We should talk about that at lunch!',
            time       : now.minus({minutes: 25}).toISO(), // 25 minutes ago
            read       : false,
        },
        {
            id         : '608b4479-a3ac-4e26-8675-3609c52aca58',
            image      : 'assets/images/avatars/male-04.jpg',
            title      : 'Leo Gill (Client #8817)',
            description: 'You can download the latest invoices now. Please check and let me know.',
            time       : now.minus({minutes: 50}).toISO(), // 50 minutes ago
            read       : false,
        },
        {
            id         : '22148c0c-d788-4d49-9467-447677d11b76',
            image      : 'assets/images/avatars/female-01.jpg',
            title      : 'Sarah',
            description: 'Don\'t forget to pickup Jeremy after school!',
            time       : now.minus({hours: 3}).toISO(), // 3 hours ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '492e2917-760c-4921-aa5a-3201a857cd48',
            image      : 'assets/images/avatars/female-12.jpg',
            title      : 'Nancy Salazar &bull; Joy Publishing',
            description: 'I\'ll proof read your bio on next Monday.',
            time       : now.minus({hours: 5}).toISO(), // 5 hours ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '214a46e5-cae7-4b18-9869-eabde7c7ea52',
            image      : 'assets/images/avatars/male-06.jpg',
            title      : 'Matthew Wood',
            description: 'Dude, I heard that they are going to promote you! Congrats man, tonight the drinks are on me!',
            time       : now.minus({hours: 7}).toISO(), // 7 hours ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '95930319-61cc-4c7e-9324-f1091865330c',
            image      : 'assets/images/avatars/female-04.jpg',
            title      : 'Elizabeth (New assistant)',
            description: 'Boss, I\'ve sent all client invoices but Geoffrey refusing to pay.',
            time       : now.minus({hours: 9}).toISO(), // 9 hours ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '802935e9-9577-48bc-98d1-308a4872afd7',
            image      : 'assets/images/avatars/male-06.jpg',
            title      : 'William Bell',
            description: 'Did you see this game? We should hang out and give it a shot sometime.',
            time       : now.minus({day: 1}).toISO(), // 1 day ago
            read       : true,
            link       : 'https://www.google.com',
            useRouter  : false,
        },
        {
            id         : '059f3738-633b-48ea-ad83-19016ce24c62',
            image      : 'assets/images/avatars/female-09.jpg',
            title      : 'Cheryl Obrien - HR',
            description: 'Why did\'t you still look at the kitten pictures I\'ve sent to you!',
            time       : now.minus({day: 3}).toISO(), // 3 days ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '5c2bb44d-5ca7-42ff-ad7e-46ced9f49a24',
            image      : 'assets/images/avatars/female-15.jpg',
            title      : 'Joan Jones - Tech',
            description: 'Dude, Cheryl keeps bugging me with kitten pictures all the time :( What are we gonna do about it?',
            time       : now.minus({day: 4}).toISO(), // 4 days ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        }
        ];
    const navigationService = [
        {
            id: 'example',
            title: 'Example',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/example'
        },
        {
            id: 'juan',
            title: 'Juan',
            type: 'basic',
            icon: 'heroicons_outline:chart-pie',
            link: '/homeScreen'
        }
    ];
    const notificationsService = [
        {
            id         : '493190c9-5b61-4912-afe5-78c21f1044d7',
            icon       : 'heroicons_mini:star',
            title      : 'Daily challenges',
            description: 'Your submission has been accepted',
            time       : now.minus({minute: 25}).toISO(), // 25 minutes ago
            read       : false,
        },
        {
            id         : '6e3e97e5-effc-4fb7-b730-52a151f0b641',
            image      : 'assets/images/avatars/male-04.jpg',
            description: '<strong>Leo Gill</strong> added you to <em>Top Secret Project</em> group and assigned you as a <em>Project Manager</em>',
            time       : now.minus({minute: 50}).toISO(), // 50 minutes ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : 'b91ccb58-b06c-413b-b389-87010e03a120',
            icon       : 'heroicons_mini:envelope',
            title      : 'Mailbox',
            description: 'You have 15 unread mails across 3 mailboxes',
            time       : now.minus({hour: 3}).toISO(), // 3 hours ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '541416c9-84a7-408a-8d74-27a43c38d797',
            icon       : 'heroicons_mini:arrow-path',
            title      : 'Cron jobs',
            description: 'Your <em>Docker container</em> is ready to publish',
            time       : now.minus({hour: 5}).toISO(), // 5 hours ago
            read       : false,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : 'ef7b95a7-8e8b-4616-9619-130d9533add9',
            image      : 'assets/images/avatars/male-06.jpg',
            description: '<strong>Roger Murray</strong> accepted your friend request',
            time       : now.minus({hour: 7}).toISO(), // 7 hours ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : 'eb8aa470-635e-461d-88e1-23d9ea2a5665',
            image      : 'assets/images/avatars/female-04.jpg',
            description: '<strong>Sophie Stone</strong> sent you a direct message',
            time       : now.minus({hour: 9}).toISO(), // 9 hours ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : 'b85c2338-cc98-4140-bbf8-c226ce4e395e',
            icon       : 'heroicons_mini:envelope',
            title      : 'Mailbox',
            description: 'You have 3 new mails',
            time       : now.minus({day: 1}).toISO(), // 1 day ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '8f8e1bf9-4661-4939-9e43-390957b60f42',
            icon       : 'heroicons_mini:star',
            title      : 'Daily challenges',
            description: 'Your submission has been accepted and you are ready to sign-up for the final assigment which will be ready in 2 days',
            time       : now.minus({day: 3}).toISO(), // 3 days ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
        {
            id         : '30af917b-7a6a-45d1-822f-9e7ad7f8bf69',
            icon       : 'heroicons_mini:arrow-path',
            title      : 'Cron jobs',
            description: 'Your Vagrant container is ready to download',
            time       : now.minus({day: 4}).toISO(), // 4 days ago
            read       : true,
            link       : '/dashboards/project',
            useRouter  : true,
        },
    ];
    // const quickChatService = inject(QuickChatService);
    // const shortcutsService = inject(ShortcutsService);
    const quickChatService = [
        {
            id           : 'ff6bc7f1-449a-4419-af62-b89ce6cae0aa',
            contactId    : '9d3f0e7f-dcbd-4e56-a5e8-87b8154e9edf',
            unreadCount  : 2,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '4459a3f0-b65e-4df2-8c37-6ec72fcc4b31',
            contactId    : '16b9e696-ea95-4dd8-86c4-3caf705a1dc6',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'f73a5a34-a723-4b35-8439-5289e0164c83',
            contactId    : 'bf172879-423a-4fd6-8df3-6d1938bbfe1f',
            unreadCount  : 1,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '747f101c-0371-4ca3-9f20-cb913a80fe89',
            contactId    : 'abd9e78b-9e96-428f-b3ff-4d934c401bee',
            unreadCount  : 0,
            muted        : true,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'b3facfc4-dfc2-4ac2-b55d-cb70b3e68419',
            contactId    : '6519600a-5eaa-45f8-8bed-c46fddb3b26a',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'e3127982-9e53-4611-ac27-eb70c84be4aa',
            contactId    : 'b62359fd-f2a8-46e6-904e-31052d1cd675',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'a30351f3-bfa6-4ce3-b13a-82748fe0edee',
            contactId    : '2c37ed00-427a-46d7-8f8f-d711c768d1ee',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '5636c0ba-fa47-42ca-9160-27340583041e',
            contactId    : 'b8258ccf-48b5-46a2-9c95-e0bd7580c645',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'feddd91a-51af-48d8-99b0-cd99ee060a36',
            contactId    : 'e2946946-b4b5-4fd7-bab4-62c38cdff2f1',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '89421c2f-1751-4040-b09b-4a4268db47b9',
            contactId    : '12148fa2-e0a4-49fb-b3c5-daeecdb5180a',
            unreadCount  : 0,
            muted        : true,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'ffbbfdb4-0485-44aa-8521-5ce1eda3fd2f',
            contactId    : '81fdc48c-5572-4123-8a73-71b7892120de',
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : 'a477baea-df90-4e2f-b108-7791bcd50bc8',
            contactId    : 'a9a9f382-e4c3-42fb-9fe9-65aa534732b5',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '450840c8-aa0b-47a4-b6ca-b864ad9a3a88',
            contactId    : '7e8e1f1e-d19f-45c7-86bd-6fef599dae71',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '427270f0-841c-47f9-912c-3fd8139db5e6',
            contactId    : '8141dd08-3a6e-4770-912c-59d0ed06dde6',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        },
        {
            id           : '491b2918-e71e-4017-919e-0ba009afd003',
            contactId    : '114642a2-ccb7-4cb1-ad2b-5e9b6a0c1d2e',
            unreadCount  : 0,
            muted        : false,
            lastMessage  : 'See you tomorrow!',
            lastMessageAt: '26/04/2021',
        }
        ];
    const shortcutsService = [
        {
            id         : 'a1ae91d3-e2cb-459b-9be9-a184694f548b',
            label      : 'Changelog',
            description: 'List of changes',
            icon       : 'heroicons_outline:clipboard-document-list',
            link       : '/docs/changelog',
            useRouter  : true,
        },
        {
            id         : '989ce876-c177-4d71-a749-1953c477f825',
            label      : 'Documentation',
            description: 'Getting started',
            icon       : 'heroicons_outline:book-open',
            link       : '/docs/guides/getting-started/introduction',
            useRouter  : true,
        },
        {
            id         : '2496f42e-2f25-4e34-83d5-3ff9568fd984',
            label      : 'Help center',
            description: 'FAQs and guides',
            icon       : 'heroicons_outline:information-circle',
            link       : '/apps/help-center',
            useRouter  : true,
        },
        {
            id         : '3c48e75e-2ae7-4b73-938a-12dc655be28b',
            label      : 'Dashboard',
            description: 'User analytics',
            icon       : 'heroicons_outline:chart-pie',
            link       : '/dashboards/analytics',
            useRouter  : true,
        },
        {
            id         : '2daac375-a2f7-4393-b4d7-ce6061628b66',
            label      : 'Mailbox',
            description: '5 new e-mails',
            icon       : 'heroicons_outline:envelope',
            link       : 'apps/mailbox',
            useRouter  : true,
        },
        {
            id         : '56a0a561-17e7-40b3-bd75-0b6cef230b7e',
            label      : 'Tasks',
            description: '12 unfinished tasks',
            icon       : 'heroicons_outline:check-circle',
            link       : '/apps/tasks',
            useRouter  : true,
        },
        {
            id         : 'f5daf93e-b6f3-4199-8a0c-b951e92a6cb8',
            label      : 'Contacts',
            description: 'List all contacts',
            icon       : 'heroicons_outline:user-group',
            link       : '/apps/contacts',
            useRouter  : true,
        },
        {
            id         : '0a240ab8-e19d-4503-bf68-20013030d526',
            label      : 'Reload',
            description: 'Reload the app',
            icon       : 'heroicons_outline:arrow-path',
            link       : '/dashboards/project',
            useRouter  : false,
        },
    ];

    // Fork join multiple API endpoint calls to wait all of them to finish
    return forkJoin([
        navigationService,
        messagesService,
        notificationsService,
        quickChatService,
        shortcutsService,
    ]);
};
