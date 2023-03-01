type permsItemType = {
  authority: string
}

export type loginType = {
  token: {
    authorization: string
    base1: string
    base2: string
  }
  user: {
    perms: permsItemType[]
    subsidiaryId: number
  }
}
