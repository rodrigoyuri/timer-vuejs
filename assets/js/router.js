const Foo = { template: '<div>Foo</div>'}

const routes  = [
    {path: '/foo', component: Foo}
]

export const router = new VueRouter({
    routes
})