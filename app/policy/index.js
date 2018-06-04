import { AbilityBuilder, Ability } from "casl"

export default async (user) => {
  const { rules, can } = await AbilityBuilder.extract()
  const role = user ? user.role : "guest"

  if (role == "guest") {
    can('read', "icoes", { approve: true, visibleUser: true,  visibleAdmin: true })
  }

  if (role == "user") {
    can('read', "icoes", { approve: true, visibleUser: true,  visibleAdmin: true })
    can('read', "icoes", { user: user.id })

    can('create', 'icoes')
    can('update', 'icoes', { user: user._id })
    can('delete', 'icoes', { user: user._id })

    can('read', "users", { _id: user.id })
    can('update', 'users', { _id: user.id, role: "user" })
    can('delete', 'users', { _id: user.id })
  }

  if (role == "admin") {
    can('read', "icoes")
    can('create', 'icoes')
    can('update', 'icoes')
    can('delete', 'icoes')

    can('access', "icoVisibleAdmin")
    can('access', "updateOtherUsers")

    can('read', "users", { role: "user" })
    can('update', 'users', { _id: user.id })
    can('delete', 'users', { _id: user.id })
  }

  if (role == "superAdmin") {
    can('read', "icoes")
    can('create', 'icoes')
    can('update', 'icoes')
    can('delete', 'icoes')

    can('access', "icoVisibleAdmin")
    can('access', "updateOtherUsers")
    can('access', "editor")

    can('read', "users", "all")
    can('update', 'users', "all")
    can('delete', "users", "all")
  }

  if (role == "admin" || role == "superAdmin") {
    can('read', "articles", "all")
    can('create', "articles", "all")
    can('update', 'articles', "all")
    can('delete', "articles", "all")
    
    can('read', "news", "all")
    can('create', "news", "all")
    can('update', 'news', "all")
    can('delete', "news", "all")
    
    can('read', "videos", "all")
    can('create', "videos", "all")
    can('update', 'videos', "all")
    can('delete', "videos", "all")
  }

  return await new Ability(rules)
}
