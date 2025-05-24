export type Maybe<A> = Some<A> | None
export type Type<A> = Maybe<A>
export type T<A> = Type<A>

const NoneTag: unique symbol = Symbol("Maybe.None")
const SomeTag: unique symbol = Symbol("Maybe.Some")

export const tags = {
  None: NoneTag,
  Some: SomeTag,
} as const

interface Some<A> {
    type: typeof tags.Some
    value: A
}

interface None {
    type: typeof tags.None
}

export function some<A>(value: A): Some<A> {
    return {
        type: tags.Some,
        value,
    }
}

export function none(): None {
    return {
        type: tags.None,
    }
}

export function from<A>(a: A): Maybe<A> {
    if (a == null) return none()
    return some(a)
}

export function map<A, B>(fn: (a: A) => B, maybe: Maybe<A>): Maybe<B> {
    switch (maybe.type) {
        case tags.None:
            return none()
        case tags.Some:
            return some(fn(maybe.value))
    }
}

export function andThen<A, B>(
    fn: (a: A) => Maybe<B>,
    maybe: Maybe<A>
): Maybe<B> {
    switch (maybe.type) {
        case tags.None:
            return none()
        case tags.Some:
            return fn(maybe.value)
    }
}
