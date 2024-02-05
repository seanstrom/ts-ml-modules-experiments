export type Maybe<A> = Some<A> | None
export type Type<A> = Maybe<A>
export type T<A> = Type<A>

enum Tags {
    None = "Maybe.None",
    Some = "Maybe.Some",
}

interface Some<A> {
    type: Tags.Some
    value: A
}

interface None {
    type: Tags.None
}

export const tags = Object(Tags)

export function some<A>(value: A): Some<A> {
    return {
        type: Tags.Some,
        value,
    }
}

export function none(): None {
    return {
        type: Tags.None,
    }
}

export function from<A>(a: A): Maybe<A> {
    if (a == null) return none()
    return some(a)
}

export function map<A, B>(fn: (a: A) => B, maybe: Maybe<A>): Maybe<B> {
    switch (maybe.type) {
        case Tags.None:
            return none()
        case Tags.Some:
            return some(fn(maybe.value))
    }
}

export function andThen<A, B>(
    fn: (a: A) => Maybe<B>,
    maybe: Maybe<A>
): Maybe<B> {
    switch (maybe.type) {
        case Tags.None:
            return none()
        case Tags.Some:
            return fn(maybe.value)
    }
}
